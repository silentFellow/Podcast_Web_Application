import Sidenav from "./SIdenav"


export const Createpod = () => {

    return (


        <div>
            <Sidenav />

            <div className="CreatePodc">
                <h2>Create PodCast</h2>

                <div className="UploadPost">
                    <h3>Upload Thumbnail</h3>
                    <div className="Poster">
                        <h4>Click to Upload to Poster</h4>
                        <img src={"addnew"} alt="" /> {/* todo: add new image goes here */}
                    </div>

                    <div className="author">
                        <h4>PodCast Name</h4>
                        <div className="emailContainer"><input type="text" placeholder="PodCastName" className="emailid" defaultValue='' /></div>
                    </div>
                    <div className="author">
                        <h4>PodCast Description</h4>
                        <div className="emailContainer"><input type="text" placeholder="Description" className="emailid" defaultValue='' /></div>
                    </div>
                    <div className="author">
                        <h4>PodCast Description</h4>
                        <div className="emailContainer"><input type="text" placeholder="Description" className="emailid" defaultValue='' /></div>
                    </div>
                    <div className="author">
                        <h4>Author Name</h4>
                        <div className="emailContainer"><input type="text" placeholder="AuthorName" className="emailid" defaultValue='' /></div>
                    </div>
                    <div className="author">
                        <h4>Category</h4>

                        <div style={{ display: "flex", marginTop: "10px" }}>
                            <label className="form-control">
                                <input type="radio" name="radio" />
                                Video
                            </label>
                            <label className="form-control">
                                <input type="radio" name="radio" />
                                Audio
                            </label>
                        </div>
                        <div className="author" style={{marginTop:"30px"}}>
                            <h4>Upload File</h4>
                            <div className="emailContainer"><input type="file" size={60} placeholder="AuthorName" className="emailid" defaultValue='' /></div>
                        </div>

                        <div className="publish">
                            <button className="savebtn">Save Draft</button>
                            <button className="savebtn">Publish</button>
                        </div>
                    </div>



                </div>
            </div>
        </div>



    )
}