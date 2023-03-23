import React from "react";
import "../../assets/libs/dropzone/dropzone.min.css";
import "../../assets/libs/dropify/dropify.min.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/icons.min.css";
import "../../assets/css/app.min.css";
import "../../assets/libs/dropzone/dropzone.min.js";

const AddBanners = () => {
    return(
        <>
            <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
            
                                        <form action="/" method="post" className="dropzone" id="myAwesomeDropzone">
                                            <div className="fallback">
                                                <input name="file" type="file" multiple="" />
                                            </div>
            
                                            <div className="dz-message needsclick">
                                                <i className="h1 text-muted dripicons-cloud-upload"></i>
                                                <h3>Drop files here or click to upload.</h3>
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

