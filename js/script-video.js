document.addEventListener("DOMContentLoaded", function () {
  const customContainers = document.querySelectorAll(".asdrubale .custom-container");
  let scrollPosition = 0;

  customContainers.forEach((customContainer, index) => {
    const customMainVideo = customContainer.querySelector("video");
    const customVideoTimeline = customContainer.querySelector(".custom-video-timeline");
    const customProgressBar = customContainer.querySelector(".custom-progress-bar");
    const customVolumeBtn = customContainer.querySelector(".custom-volume i");
    const customVolumeSlider = customContainer.querySelector(".left input");
    const customCurrentVidTime = customContainer.querySelector(".custom-current-time");
    const customVideoDuration = customContainer.querySelector(".custom-video-duration");
    const customPlayPauseBtn = customContainer.querySelector(".custom-play-pause i");
    const customPipBtn = customContainer.querySelector(".custom-pic-in-pic span");
    const customFullScreenBtn = customContainer.querySelector(".custom-fullscreen i");
    let customTimer;
    

    const hideCustomControls = () => {
      if (customMainVideo.paused) return;
      customTimer = setTimeout(() => {
        customContainer.classList.remove("show-custom-controls");
      }, 3000);
    };

    hideCustomControls();


    document.addEventListener('touchmove', function(e) {
      // Impedisci il comportamento predefinito solo se il tocco è all'interno della zona del lettore video
      if (e.target.closest('.asdrubale')) {
        e.preventDefault();
      }
    }, { passive: false });


    customContainer.addEventListener("mousemove", () => {
      customContainer.classList.add("show-custom-controls");
      clearTimeout(customTimer);
      hideCustomControls();
    });

    const formatCustomTime = (time) => {
      let seconds = Math.floor(time % 60),
        minutes = Math.floor(time / 60) % 60,
        hours = Math.floor(time / 3600);

      seconds = seconds < 10 ? `0${seconds}` : seconds;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      hours = hours < 10 ? `0${hours}` : hours;

      if (hours == 0) {
        return `${minutes}:${seconds}`;
      }
      return `${hours}:${minutes}:${seconds}`;
    };

    customVideoTimeline.addEventListener("mousemove", (e) => {
      let timelineWidth = customVideoTimeline.clientWidth;
      let offsetX = e.offsetX;
      let percent = Math.floor((offsetX / timelineWidth) * customMainVideo.duration);
      const progressTime = customVideoTimeline.querySelector("span");
      offsetX = offsetX < 20 ? 20 : offsetX > timelineWidth - 20 ? timelineWidth - 20 : offsetX;
      progressTime.style.left = `${offsetX}px`;
      progressTime.innerText = formatCustomTime(percent);
    });

    customVideoTimeline.addEventListener("click", (e) => {
      let timelineWidth = customVideoTimeline.clientWidth;
      customMainVideo.currentTime = (e.offsetX / timelineWidth) * customMainVideo.duration;
    });

    customMainVideo.addEventListener("timeupdate", (e) => {
      let { currentTime, duration } = e.target;
      let percent = (currentTime / duration) * 100;
      customProgressBar.style.width = `${percent}%`;
      customCurrentVidTime.innerText = formatCustomTime(currentTime);
    });

    customMainVideo.addEventListener("loadeddata", () => {
      customVideoDuration.innerText = formatCustomTime(customMainVideo.duration);
    });

    const draggableCustomProgressBar = (e) => {
      let timelineWidth = customVideoTimeline.clientWidth;
      customProgressBar.style.width = `${(e.offsetX / timelineWidth) * 100}%`;
      customMainVideo.currentTime = (e.offsetX / timelineWidth) * customMainVideo.duration;
      customCurrentVidTime.innerText = formatCustomTime(customMainVideo.currentTime);
    };

    customVolumeBtn.addEventListener("click", () => {
      if (!customVolumeBtn.classList.contains("fa-volume-high")) {
        customMainVideo.volume = 0.5;
        customVolumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
      } else {
        customMainVideo.volume = 0.0;
        customVolumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
      }
      customVolumeSlider.value = customMainVideo.volume;
    });

    customVolumeSlider.addEventListener("input", (e) => {
      customMainVideo.volume = e.target.value;
      if (e.target.value == 0) {
        return customVolumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
      }
      customVolumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    });

    const exitFullscreenHandler = () => {
      if (!document.fullscreenElement) {
        customContainer.classList.remove("fullscreen");
        customFullScreenBtn.classList.replace("fa-compress", "fa-expand");
        resizeHandler();
        window.scrollTo(0, scrollPosition);
      }
    };

    const resizeHandler = () => {
      if (!document.fullscreenElement) {
        window.scrollTo(0, scrollPosition);
      }
    };

    const keyupHandler = (e) => {
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          customContainer.classList.remove("fullscreen");
          customFullScreenBtn.classList.replace("fa-compress", "fa-expand");
          document.exitFullscreen();
          resizeHandler();
        }
      }
    };

    document.addEventListener("fullscreenchange", exitFullscreenHandler);
    window.addEventListener("resize", resizeHandler);
    document.addEventListener("keyup", keyupHandler);

    customFullScreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        scrollPosition = window.scrollY;
      }
      customContainer.classList.toggle("fullscreen");
      if (document.fullscreenElement) {
        customFullScreenBtn.classList.replace("fa-compress", "fa-expand");
        document.exitFullscreen().then(() => {
          setTimeout(resizeHandler, 10);
        });
      } else {
        customFullScreenBtn.classList.replace("fa-expand", "fa-compress");
        customContainer.requestFullscreen();
        setTimeout(resizeHandler, 10);
      }
    });

    customPipBtn.addEventListener("click", () => customMainVideo.requestPictureInPicture());
    customMainVideo.addEventListener("play", () => customPlayPauseBtn.classList.replace("fa-play", "fa-pause"));
    customMainVideo.addEventListener("pause", () => customPlayPauseBtn.classList.replace("fa-pause", "fa-play"));

    customPlayPauseBtn.addEventListener("click", () => {
      if (customMainVideo.paused) {
        customMainVideo.play();
      } else {
        customMainVideo.pause();
      }
    });

    customVideoTimeline.addEventListener("mousedown", () => customVideoTimeline.addEventListener("mousemove", draggableCustomProgressBar));
    document.addEventListener("mouseup", () => customVideoTimeline.removeEventListener("mousemove", draggableCustomProgressBar));

    customMainVideo.addEventListener("click", () => {
      if (customMainVideo.paused) {
        customMainVideo.play();
      } else {
        customMainVideo.pause();
      }
    });
  });
});
