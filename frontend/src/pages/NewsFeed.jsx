import React, { useState,useEffect } from "react";

const NewsFeed = () => {

    
    const [category,setCategory] = useState('Status')
    
    

    let handleOnChange = (e) =>{
        setCategory(e.target.value)
    }

    return (
        <>
        <div className="headers"></div>
        <section id="newsfeed">
            <div className="create_post">
                <form action="" method="POST" encType="multipart/form-data">
                    <textarea name="caption" id="id_caption" className="form-control" placeholder="Write something..." cols="30" rows="10"></textarea>
                    <select name="category" onChange={(e) => {handleOnChange(e)}} id="id_category">
                        <option value="Status">Status</option>
                        <option value="Request">Request</option>
                        <option value="Requirement">Requirement</option>
                        <option value="House Rent">House Rent</option>
                    </select>
                    <input type="file" name="post_images" multiple/>
                    <div class="hide-option" style={{display : category=="Status" ? 'None' : 'block'}}>
                        <input type="text" class="form-control" name="additional_address" placeholder="Write address info"/>
                        <input type="text" name="division" id = "division" placeholder="Division...."/>
                        <input type="text" name="district" id = "district" placeholder="District...."/>
                        <input type="text" name="city" id = "city" placeholder="City...."/>
                    </div>

                </form>
            </div>
        </section>
        </>
    )
}

export default NewsFeed;