function loaderImit() { 
    const body = document.getElementsByTagName('body')[0]
    body.style.overflowY= "hidden"
    window.scrollTo(0, 0);
    setTimeout(()=> {
        const loader = document.getElementById("Loader")
        loader.remove();
        body.style.overflowY= "scroll"
    }, 1000)
}

export { loaderImit }