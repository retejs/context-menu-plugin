import debounce from '../../lib/debounce';

export default (hideMethod) => ({
    props: { delay: { type: Number, required: true } },
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
        this.timeoutHide = debounce(this[hideMethod], this.delay);
    }
})
