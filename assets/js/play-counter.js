class PlayCounter {
    constructor() {
        this.video = null;
        this.is_counting = false;
        this.current_counter = 0;
        this.video_number_list = [];
        this.interval = null;
        PlayCounter.instance = this;
    }

    static create(video) {
        const instance = new PlayCounter();
        instance.initialize(video);
    }


    initialize(video) {
        this.video = video;
        this.video.onplay = () => {
            this.onVideoPlay();
        };

        this.video.onended = () => {
            this.onVideoEnded();
        };

        this.video.onpause = () => {
            this.onPause();
        };

        this.video.onseeking = () => {
            this.onSeeking();
        };

        this.video.onseeked = () => {
            this.onSeeked();
        };
        this.video.ontimeupdate = () => {
            this.onTimeUpdate();
        };
        this.interval = setInterval(() => {
            this.count();
        }, 1000);
        
    }

    onVideoPlay() {
        alert('Video başlaltıldı');
        this.is_counting = true;
        // document.getElementById('avatar-btn').click();
        // const email = document.getElementById('email');
        // if(email){
        //     this.email = email.getAttribute('title');
        //     console.log('email',email);
        // }

    }

    onVideoEnded() {
        alert('Video Bitti');
        this.is_counting = false;
        this.finish();
    }
    onTimeUpdate(){

        console.log('this.video.currentTime',  this.formatTime(this.video.currentTime));
        console.log('this.video.duration',this.formatTime(this.video.duration));

    }
    onPause() {
        alert('video durdu.');
        this.is_counting = false;
    }

    onSeeking() {
        this.is_counting = false;
    }

    onSeeked() {
        this.is_counting = false;
        alert('atlama yapma lan');
        this.finish();
    }

    count() {
        if (this.is_counting) {
            this.current_counter++;
        }
    }

    finish() {
        alert('bitti la, toplam ' + this.current_counter + 'saniye. Dur yenisini veriyorum');
        this.reset();
    }

    reset() {
        this.is_counting = false;
        this.current_counter = 0;
        this.video.onplay = null;
        this.video.onended = null;
        this.video.onpause = null;
        this.video.onseeking = null;
        this.video.onseeked = null;
        this.video.ontimeupdate = null;

        if (this.interval === null) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }


    formatTime(seconds) {

        var minutes = Math.floor(seconds / 60);
        var secs= Math.floor(seconds % 60);
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (secs < 10) {
            secs = '0' + secs;
        }
        return minutes +  ':' + secs;
    }

}
