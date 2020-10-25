const closeModal = setShow => {
    document.documentElement.setAttribute("style", "overflow: auto");
    document.getElementsByTagName("BODY")[0].setAttribute("style", "overflow: auto");
    setShow(false);
} 

export default closeModal;