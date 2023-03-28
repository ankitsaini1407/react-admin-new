import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

const config = {
    buttons: ['source', '|',
        'bold',
        'strikethrough',
        'underline',
        'italic', '|',
        'ul',
        'ol', '|',
        'outdent', 'indent', '|',
        'font',
        'fontsize',
        'brush',
        'paragraph', '|',
        'image',
        'video',
        'table',
        'link', '|',
        'align', 'undo', 'redo', '|',
        'hr',
        'eraser',
        'copyformat', '|',
        'symbol',
        'fullsize',
        'print',
        'about'],
};

const AddCms = () => {
    const [value, setValue] = useState();
    const getValue = (val) => {
        setValue(val);
    };
    const editor = useRef(null);
    return (
        <div>
            <div>
                <JoditEditor
                    ref={editor}
                    config={config}
                    initialValue="" 
                    getValue={getValue}
                    tabIndex={1}
                    onChange={(newContent) => getValue(newContent)}
                />
            </div>
            <div>{value}</div>
        </div>
    );
};
export default AddCms;