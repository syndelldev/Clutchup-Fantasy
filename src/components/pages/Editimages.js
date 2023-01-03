import { Link, useHistory, useLocation } from "react-router-dom";
import React, { useEffect,useState } from "react";
import id_images from "../../images/Ellipse 54.png";
import { supabase } from "../../supabaseClient";

function Editimages(props) {
  let height = props.height;
  const email = props.email;
  console.log("useremail",email);
  const [file, setFile] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [proFileSize, setProFileSize] = useState(false);
  const [Email,setEmail] = useState('');
  
  const [userLatter,setUserLatter] = useState('');
  const [Username,setUsername] =useState('');
  const history = useHistory();
  const [uploading, setUploading] = useState(false)
  function handleChange(e) {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }
  useEffect(() => {
    downloadImage();

  }, [])
  console.log(avatarUrl);
  const downloadImage = async () => {

    try {

      let { data, error } = await supabase
        .from('user')
        .select()
        .eq('email',email)
        setAvatarUrl(data[0].avatarurl);
        setEmail(data[0].email);
        setUsername(data[0].teamusername)
        setUserLatter(data[0].teamusername.charAt(0).toUpperCase());
        // cara1ectornam = Username.charAt(0);
        console.log(data[0].teamusername.charAt(0).toUpperCase());
        if (error) {
          throw error
        }
        

    } catch (error) {

      console.log('Error downloading image: ', error.message)

    }
  }


      
  const filestype = /(.jpg|.jpeg|.png)$/i;
  const imgsubmit = async () => {
    const fileExt = file.name.split('.').pop()

    const fileName = `${Math.random()}.${fileExt}`

    const filePath = `${fileName}`
    const exten = "."+fileExt
    console.log("file",filestype);
    if (filestype.exec(exten)) {
      
      setProFileSize(false);
    console.log("filenameva",filePath);
    let { data,error: uploadError } = await supabase
    .storage.from('avatars')
    .upload(filePath, file ,{contentType: 'image/png'})
  
    

    if (uploadError) {

      throw uploadError

    }else{
      const { data,error } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(filePath)
      const url = data.publicUrl;
      console.log("imageurlget",data.publicUrl);
      if (error) {

        throw error

      }else{
        let { data, error } = await supabase
        .from('user')
        .update({avatarurl : url})
        .eq('email',email)
        setAvatarUrl(url);
        props.onClick(false);
        console.log(data[0].email);
      }
      
      setTimeout(function () {
        window.location.reload('/landing-screen/');
    }, 1500);
    }
    }else{
      
      setProFileSize(true);
      console.log(fileName);



   
  }
  };
  const closebutton = () => {
    props.onClick(false);
  };
  return (
    <div className="profilecon" style={{ height: `${height}px` }}>
      <div className="profilecontent">
        <div className="profilebox">
            <div className="w-100 text-end" >
        <button type="button" className="btn-close" onClick={closebutton} aria-label="Close"></button>
            </div>
       
          <div className="imagesprview">
            <div className="imagesprview">
              {userLatter}
              {/* <img
                className="imagesprview"
                src={!avatarUrl ? id_images : avatarUrl}
                style={{ width: "98%" }}
              /> */}
            </div>
          </div>
          <div className="my-2">{Username}</div>
          {/* <input type="file" id="file" onChange={handleChange} className='playernamebox' /> */}
          {proFileSize && (
                      <small className="d-block mb-1 red">
                        File does not support. You must use .png or .jpg
                      </small>
                    )}
                    <div className="my-2 font-weight-bold" >Mail id:<span className="emailidbox">{Email}</span></div>

          {/* <button
            className="button"
            type="submit"
            name="submit"
            value="Submit"
            onClick={imgsubmit}
          >
            Save
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Editimages;
