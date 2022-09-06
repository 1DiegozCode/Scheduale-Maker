function loaderImit() { 
    window.scrollTo(0, 0);
    setTimeout(()=> {
        const loader = document.getElementById("Loader")
        const body = document.getElementsByTagName('body')[0]
        loader.remove();
        body.style.overflowY= "scroll"
    }, 1000)
}

export { loaderImit }