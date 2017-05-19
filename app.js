/**
 * Created by Administrator on 2017/5/19 0019.
 */

function init() {

    var videoRecorder = new VideoRecorder();

    document.querySelector(".recorderBtn").onclick = function () {
        videoRecorder.recorder();
    };

    document.querySelector(".stopBtn").onclick = function () {
        videoRecorder.stop();
    };
}

init();