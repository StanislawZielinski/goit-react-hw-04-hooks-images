import React, { useState, useEffect} from "react";
import Searchbar from "../Searchbar/Searchbar";
import Button from "../Button/Button";
import { Audio } from 'react-loader-spinner';
import scroll from '../Scroll/Scroll';
import Modal from "../Modal/Modal";
import ImageGallery from "../ImageGallery/ImageGallery";
import fetch from "services/api";


const ImageFinder = () => {
    const [images, setImages] = useState([]);
    const [isButtonVisible, setIsButtonVisible] = useState("hidden");
    const [isSpinnerLoading, setIsSpinnerLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState("hidden");
    const [imageLargeURL, setImageLargeURL] = useState("");
    const [alt, setAlt] = useState("");
    const [error, setError] = useState(null);
    const [pageNr, setPageNr] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    // state = {
    //     images: [],
    //     isButtonVisible: "hidden",
    //     isSpinnerLoading: true,
    //     isModalVisible: "hidden",
    //     imageLargeURL: "",
    //     alt: "",
    //     error: null,
    //     pageNr: 1,
    //     searchValue: '',
    // }
    useEffect(() => {
        setIsSpinnerLoading(false);    
    },[])
    // componentDidMount() {
    //     this.setState({ isSpinnerLoading: false });
    // };
    const resetSearch = () => {
        setImages([]);
        setPageNr(1);
    }
    const handleChange = (event) => {
        setSearchValue(event.currentTarget.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(searchValue)
        resetSearch();
        fetchImages(searchValue, 1);
        const form = event.currentTarget;
        form.reset();
    }

    async function fetchImages(searchValue, pageNr) {
        setIsSpinnerLoading(true);
        try {
            const response = await fetch(searchValue, pageNr);
            console.log(response);
            if (response.length > 0) {
                setIsButtonVisible("visible");
                setImages(response)
                setPageNr(pageNr+1)
                // this.setState({
                //     isButtonVisible: "visible",
                //     images: [...this.state.images, ...response],
                //     pageNr: this.state.pageNr+1,
                // }) 
            }
            else {
                setIsButtonVisible("hidden");
                alert("please insert proper search request")
            }
        } catch (error) {
            setError(error);
            console.log(error)
        }
        finally {
            setIsSpinnerLoading(false);
            scroll();
        }   
    }

    // loadMore = (event) => {
    //     this.fetchImages(this.state.searchValue, this.state.pageNr);     
    // }
    
    const openModal = (event) => {
        event.preventDefault();
        setIsModalVisible("visible");
        setImageLargeURL(event.currentTarget.href)
        setAlt(event.target.alt)
    }    
    const closeModal = (event) => {
        event.stopPropagation();
        if (event.target.nodeName==="IMG") {
            return
        }
        setIsModalVisible("hidden");
        setImageLargeURL("");

    }
    // closeModalByEsc = (event) => {
    //     if (event.keyCode === 27) {
    //         this.setState({
    //         isModalVisible: "hidden", 
    //         });
    //     }
    // }
    const renderImages = (images) => {
        console.log(images);
        return images.map(
            image =>
                <li className="ImageGalleryItem" key={image.id} >
                    <a href={image.largeImageURL} onClick={openModal} >
                        <img src={image.webformatURL} alt={image.tags} className="ImageGalleryItem-image"/>
                    </a>
                </li>)     
    }

        // if (isModalVisible === "visible") {
        //     document.addEventListener('keydown', this.closeModalByEsc)
        // } 
        return (
            <div>
                <Searchbar onSubmit={handleSubmit} onChange={handleChange} />
                <ImageGallery children={renderImages(images)} ></ImageGallery>
                {/* <Button loadMore={this.loadMore} isButtonVisible={isButtonVisible} /> */}
                <Audio className="Audio" visible={isSpinnerLoading} />
                <Modal isModalVisible={isModalVisible} imageLargeURL={imageLargeURL}
                        alt={alt} closeModal={closeModal}/>
            </div>
        )
}

export default ImageFinder;
