function loaderImit() { 
    const loader = document.getElementById("Loader")
    loader.style.display = 'flex';
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY= "hidden";
    window.scrollTo(0, 0);
    setTimeout(()=> {
        loader.style.display = 'none';
        body.style.overflowY= "scroll";
    }, 1000)
}

export { loaderImit }