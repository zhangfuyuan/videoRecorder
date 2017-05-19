/**
 * Created by Administrator on 2017/5/19 0019.
 */

function VideoRecorder() {
    this.buffers = [];
    this.getMediaStream();
}

//  1、获取媒体设备的媒体流
VideoRecorder.prototype.getMediaStream = function () {

    var config = {audio:true,video:true};
    var self = this;
    navigator.mediaDevices.getUserMedia(config).then(function (stream) {
        self.mediaRecoder = new MediaRecorder(stream);

        self.mediaRecoder.ondataavailable = function (event) {
            self.buffers.push(event.data);

            // console.log(event.data);
        };
        
        self.mediaRecoder.onstart = function () {
            // console.log(11);
            self.video = document.createElement("video");
            // self.video.src = self.url;
            self.video.src = window.URL && window.URL.createObjectURL(stream) || stream;
            document.body.appendChild(self.video);
            self.video.autoplay = true;
            // console.log(self.video.src)
        };

        self.addEventListener();
    }).catch(function (error) {
        console.log(error);
    });
};

//  2、添加录制结束的事件监听，保存录制数据并提示下载
VideoRecorder.prototype.addEventListener = function () {
    var self = this;
    
    this.mediaRecoder.onstop = function () {
        self.blob = new Blob(self.buffers,{type:"video/mp4"});
        self.url = URL.createObjectURL(self.blob);
        var downloadButton = document.createElement("a");
        downloadButton.textContent = "保存到本地";
        downloadButton.href = self.url;
        downloadButton.download = self.url;
        document.body.appendChild(downloadButton);
        document.body.removeChild(self.video);
    };

};

//  3、开始录制
VideoRecorder.prototype.recorder = function () {
    if (this.mediaRecoder.state == "recording"){
        return;
    }else if(this.mediaRecoder.state == "paused"){
        this.mediaRecoder.resume();
    }else if(this.mediaRecoder.state == "inactive"){
        this.mediaRecoder.start();
    }
    console.log(this.mediaRecoder.state);
};

//  4、结束录制
VideoRecorder.prototype.stop = function () {
    if(this.mediaRecoder.state == "recording"){
        this.mediaRecoder.stop();
    }
    console.log(this.mediaRecoder.state);
}; 

window.VideoRecorder = VideoRecorder;