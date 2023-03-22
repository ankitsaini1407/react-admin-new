import React from "react";
import "../../assets/libs/dropzone/dropzone.min.css";
// import "../../assets/libs/dropify/dropify.min.css";

const AddBanners = () => {
    return(
        <>
            <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="header-title">Dropzone File Upload</h4>
                                        <p className="sub-header">
                                            DropzoneJS is an open source library that provides file uploads with image previews.
                                        </p>
            
                                        <form action="/" method="post" className="dropzone" id="myAwesomeDropzone">
                                            <div className="fallback">
                                                <input name="file" type="file" multiple="" />
                                            </div>
            
                                            <div className="dz-message needsclick">
                                                <i className="h1 text-muted dripicons-cloud-upload"></i>
                                                <h3>Drop files here or click to upload.</h3>
                                                <span className="text-muted font-13">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>
                                            </div>
                                        </form>
                                        <div className="clearfix text-right mt-3">
                                            <button type="button" className="btn btn-danger"> <i className="mdi mdi-send mr-1"></i> Submit</button>
                                        </div>

                                    </div> 
                                </div> 
                            </div>
                        </div>
        </>
    );
};

export default AddBanners;

