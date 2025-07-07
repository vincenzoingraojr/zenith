type Callback = (entries: IntersectionObserverEntry[]) => void;

class GlobalIntersectionObserver {
    private observer: IntersectionObserver;
    private targets = new Map<Element, Callback>();

    constructor(options?: IntersectionObserverInit) {
        this.observer = new IntersectionObserver(this.handleIntersections, options);
    }

    private handleIntersections = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            const callback = this.targets.get(entry.target);
            if (callback) {
                callback([entry]);
            }
        });
    };

    observe(element: Element, callback: Callback) {
        if (!this.targets.has(element)) {
            this.targets.set(element, callback);
            this.observer.observe(element);
        }
    }

    unobserve(element: Element) {
        if (this.targets.has(element)) {
            this.targets.delete(element);
            this.observer.unobserve(element);
        }
    }

    disconnect() {
        this.observer.disconnect();
        this.targets.clear();
    }
}

const globalObserver = new GlobalIntersectionObserver({
    threshold: 0.5,
});

export default globalObserver;