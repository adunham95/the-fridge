function Scrollable({children}) {
    return (<div className="w-full h-full p-5 overflow-y-auto">
        {children}
    </div>);
}

export default Scrollable;