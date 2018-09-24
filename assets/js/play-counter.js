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

        this.interval = setInterval(() => {
            this.count();
        }, 1000);
    }

    onVideoPlay() {
        alert('Video başlaltıldı');
        this.is_counting = true;
    }

    onVideoEnded() {
        alert('Video Bitti');
        this.is_counting = false;
        this.finish();
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

        if (this.interval === null) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}
