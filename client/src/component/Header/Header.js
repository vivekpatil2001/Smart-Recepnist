import "./Header.css"

function Header(){
    return(
        <>
        <div className="d-flex justify-content-evenly content">
        <h5 className="data">Patient ID</h5>
        <h5 className="data">Photo</h5>
        <h5 className="data">Name</h5> 
        <h5 className="data">Age</h5> 
        <h5 className="data">Gender</h5> 
        <h5 className="data">Address</h5>
        <h5 className="data">State</h5>       
        <h5 className="data">Delete</h5>       
        </div>
        </>
    )
}
export default Header;