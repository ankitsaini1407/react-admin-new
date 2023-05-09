import React, { useEffect, useState } from "react";
import "../../../assets/libs/simple-datatables/style.css";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import DataTable from "react-data-table-component";
import axios from "axios";
import { get_about_us_banner_route, change_about_us_banner_status_route, delete_about_us_banner_route } from "../../../utils/APIRoutes";
import "../../../assets/css/banner-toggle-btn.css";
import { ToastContainer, toast } from 'react-toastify';
import { BsFillTrashFill, BsPencilSquare, BsX } from 'react-icons/bs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import Modal from "react-bootstrap/Modal";

const AboutUsBanners = () => {
  const navigate = useNavigate();
  useEffect(() => { myFunction() }, []);
  const myFunction = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate("/");
    };
  };

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const numberOfPagePerList = [10, 15, 20];
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalImage, setTotalImage] = useState();
  const counterPage = 10;
  const [perPage, setPerPage] = useState(10);
  const [modalInfo1, setModalInfo1] = useState("");
  const [modalShow1, setModalShow1] = useState(false);

  const getData = async () => {
    try {
      await axios.get(`${get_about_us_banner_route}?type=about-us&page=${pageNumber - 1}&size=${perPage}`, { headers: { token: Cookies.get("token") } })
        .then(response => {
          if (response) {
            setData(response.data.data.result);
            setTotalImage(response.data.data.totalItems);
            setFilteredData(response.data.data.result);
          }
        }).catch(function (error) {
          if (error) {
            if (error.response.data.token.isExpired == true) {
              setTimeout(() => {
                Cookies.remove("token", "user")
                navigate("/");
              }, 3000)
              toast.error(error.response.data.token.message, toastOptions);
            }
          }
        });
    } catch (err) {
      console.log(err);
    };
  };

  const handleDelete = (id) => async (e) => {
    const del = async () => {
      await axios.delete(`${delete_about_us_banner_route}?id=${id}`).then(response => {
        getData();
        if (response) {
          toast.success(response.data.message, toastOptions);
        }
      }).catch(function (error) {
        if (error) {
          if (error.response.data.success == false) {
            toast.error(error.response.data.message, toastOptions);
          }
        }
      });
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'delete!',
      cancelButtonText: 'cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        del();
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  };

  const handleChange = (id, active) => async (e) => {
    active = !active;
    let response = await axios.post(`${change_about_us_banner_status_route}?id=${id}&isActive=${active}`);
    getData();
  };

  const columns = [
    {
      name: "S.No.",
      selector: (row, index) => ((pageNumber - 1) * perPage) + index + 1,
      sortable: true,
    },
    {
      name: "Banner",
      selector: row => <img src={row.image} width={40} alt='Banner' onClick={() => {
        setModalShow1(!modalShow1);
        setModalInfo1(row.image)
      }} />,
      sortable: true,
    },
    {
      name: "Type",
      selector: row => row.type,
      sortable: true
    },
    {
      name: "Sub_Type",
      selector: row => row.subType,
      sortable: true
    },
    {
      name: "Status",
      selector: row => row.isActive ? "Activate" : "In-Activate",
      sortable: true
    },
    {
      name: "Is-Active",
      cell: row => <label className="switch">
        <input type="checkbox" onChange={handleChange(row.id, row.isActive)} checked={row.isActive} />
        <span className="slider"></span>
      </label>
    },
    {
      name: "Action",
      cell: row => <div>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}>
          <Button style={{ backgroundColor: "transparent", border: "none" }} onClick={handleDelete(row.id)}>
            <BsFillTrashFill style={{ fontSize: "20px", color: "blue" }} />
          </Button>
        </OverlayTrigger>
      </div>
    }
  ];

  useEffect(() => {
    getData();
  }, [pageNumber, perPage]);

  const handlePageChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  }
  return (
    <div className="container">
      <DataTable
        title="Banners List"
        columns={columns}
        data={filteredData}
        pagination
        paginationServer
        paginationTotalRows={totalImage}
        paginationPerPage={counterPage}
        paginationComponentOptions={numberOfPagePerList}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRowsHighlight
        highlightOnHover
        onChangePage={(value) => setPageNumber(value)}
        onChangeRowsPerPage={handlePageChange}
        subHeader
        subHeaderAlign="right"
        actions={<Link to="/about-us/banner/add"><button data-toggle="modal" data-target="#myModal" className="btn btn-sm btn-success">ADD+</button></Link>}
      />
       {modalShow1 ? (
        <Modal
          show={modalShow1}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Image
            </Modal.Title>
            <Button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={() => setModalShow1(!modalShow1)}
            >
              <BsX style={{ fontSize: "35px", color: "black" }} />
            </Button>
          </Modal.Header>
          <Modal.Body style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <img src={modalInfo1} height={300} width={400} />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      <ToastContainer />
    </div>
  )
}

export default AboutUsBanners;