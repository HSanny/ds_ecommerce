import React from "react";
import ImageWrapper from "./common/ImageWrapper";

const ProductsImages: React.FC<{ images: string[] }> = ({
    images
}) => {

    const [imageIndex, setImageIndex] = React.useState(0);

    return (
        <ImageWrapper>
            <img src={images[imageIndex]} alt="main" className="main" />
            <div className="gallery">
                {images.map((image, index) => {
                    return (
                        <img
                            key={image}
                            src={image}
                            alt=""
                            onClick={() => setImageIndex(index)}
                            className={index === imageIndex ? "active" : undefined}
                        />
                    )
                })}
            </div>
        </ImageWrapper>
    )

}

export default ProductsImages