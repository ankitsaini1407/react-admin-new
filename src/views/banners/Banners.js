import React,{useEffect} from "react";
import "../../assets/libs/simple-datatables/style.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// import "../../assets/libs/simple-datatables/simple-datatables.js";
// import "../../assets/js/main.js";

const Banners = () =>  {
    const navigate = useNavigate();

    useEffect(()=>{myFunction()},[]);
  const myFunction = async () => {
    const token = Cookies.get('token');
    if(!token){
        navigate("/");
    };
    };
    return(
        <>
          <section className="section">
      <div className="row">
        <div className="col-lg-12">

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Banners</h5>

              <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                <div className="datatable-top">
                    <div className="datatable-dropdown">
                        <label><select className="datatable-selector">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            </select>
                            entries per page
                            </label>
                    </div>
                    <div className="datatable-search">
                        <input className="datatable-input" placeholder="Search..." type="search" title="Search within table" />
                    </div>
                </div>
              <table className="table datatable">
                <thead>
                  <tr>
                    <th scope="col">S.NO.</th>
                    <th scope="col">Banner</th>
                    <th scope="col">Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Is-Active</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Brandon Jacob</td>
                    <td>Designer</td>
                    <td>28</td>
                    <td>yes</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
        </>
    )
}

export default Banners;