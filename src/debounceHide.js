import { debounce } from 'lodash';

export default (hideMethod, time = 1000) => ({
    data() {
        return {
            timeoutHide: () => {}
        }
    },
    methods: {
        cancelHide() {
            const hide = this.timeoutHide;
    
            if (hide && hide.cancel)
                this.timeoutHide.cancel();
        }
    },
    mounted() {
        this.timeoutHide = debounce(this[hideMethod], time);
    }
})