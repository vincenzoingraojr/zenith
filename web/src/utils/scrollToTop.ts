export const scrollToTop = (pathname?: string) => {
    if ((!pathname || (pathname && window.location.pathname.startsWith(pathname))) && window.scrollY > 0) {
        window.scrollTo(0, 0);
    }
}