import React from 'react';

export const AppFooter = (props) => {

    return (
        <div className="layout-footer">
            <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/heapLogo.png' : 'assets/layout/images/heapLogo.png'} alt="Logo" height="20" className="mr-2" />
            by
            <span className="font-medium ml-2">Heap</span>
        </div>
    );
}
