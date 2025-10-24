import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";

const ProductDetail = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  // ✅ Set related products
  useEffect(() => {
    if (products.length > 0 && product) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) => product.category === item.category && item._id !== product._id
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products, product]);

  // ✅ Set default thumbnail to first image
  useEffect(() => {
      setThumbnail(product?.image[0] ? product.image[0] : null);
    
  }, [product]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="mt-12">
      {/* Breadcrumb */}
      <p>
        <Link to="/">Home</Link> /
        <Link to="/products">Products</Link> /
        <Link to={`/products/${product.category.toLowerCase()}`}>
          {product.category}
        </Link>{" "}
        /<span className="text-indigo-500">{product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/* ✅ Product Images */}
        <div className="flex gap-3">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {product.image.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className={`border rounded overflow-hidden cursor-pointer transition-all duration-200 ${
                  thumbnail === image
                    ? "border-indigo-500 scale-105"
                    : "border-gray-400/30 hover:border-gray-400"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main Selected Image */}
          <div className="border border-gray-500/30 w-96 h-96 rounded overflow-hidden flex justify-center items-center bg-white">
            <img
              src={thumbnail}
              alt="Selected product"
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* ✅ Product Details */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="Rating star"
                  className="md:w-4 w-3.5"
                />
              ))}
            <p className="text-base ml-2">(4)</p>
          </div>

          <div className="mt-6">
            <p className="text-gray-500/70 line-through">
              MRP: {currency}
              {product.price}
            </p>
            <p className="text-2xl font-medium">
              MRP: {currency}
              {product.offerPrice}
            </p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {product.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
