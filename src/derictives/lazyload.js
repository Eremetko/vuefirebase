export default {
  inserted: el => {
    const loadImage = () => {
      el.src = el.dataset.src
    }

    const loading = (entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          loadImage();
          observer.unobserve(el);
        }
      })
    }
    const observerCreate = () => {
      const options = {
        root: null,
        threshold: 0.1
      }
      const observer = new IntersectionObserver(loading, options);
      observer.observe(el);
    }

    if(!window['IntersectionObserver']){
      loadImage();
    } else {
      observerCreate();
    }
  }
}
