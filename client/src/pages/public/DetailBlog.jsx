import React, { useEffect, useState } from 'react';
import { BreadCrumb, Button } from '../../components';
import { apiDislikeBlog, apiGetOneBlog, apiLikeBlog } from '../../apis';
import { useParams } from 'react-router-dom';
import { FaLongArrowAltLeft, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import moment from 'moment';
import withBase from '../../hocs/withBase';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { getCurrentBlog } from '../../store/blog/asyncAction';

const DetailBlog = () => {
  const [detailBlog, setDetailBlog] = useState([]);
  // const dispatch = useDispatch();
  // const [likes, setLikes] = useState(0);
  // const [dislikes, setDislikes] = useState(0);
  // const [hasLiked, setHasLiked] = useState(false);
  // const [hasDisliked, setHasDisliked] = useState(false);
  const params = useParams();
  const getBlog = async () => {
    const response = await apiGetOneBlog(params.bid);
    if (response.success) {
      setDetailBlog(response.rs);
      // setLikes(response.data.likes.length);
      // setDislikes(response.data.dislikes.length);
      // setHasLiked(response.data.likes.includes(postId));
      // setHasDisliked(response.data.dislikes.includes(postId));
    }
  };

  // const handleLike = async () => {
  //   try {
  //     if (hasLiked) {
  //       // Unlike the blog post
  //       await apiLikeBlog(params.bid, false); // Truyền false để chỉ đánh dấu bài đăng không được thích
  //       setLikes(likes - 1);
  //     } else {
  //       // Like the blog post
  //       await apiLikeBlog(params.bid, true); // Truyền true để chỉ đánh dấu bài đăng được thích
  //       setLikes(likes + 1);
  //       if (hasDisliked) {
  //         // If user disliked before, remove dislike
  //         setDislikes(dislikes - 1);
  //         setHasDisliked(false);
  //       }
  //     }
  //     setHasLiked(!hasLiked);
  //     dispatch(getCurrentBlog());
  //   } catch (error) {
  //     console.error('Error liking/disliking blog:', error);
  //   }
  // };
  // const handleDislike = async () => {
  //   try {
  //     if (hasDisliked) {
  //       // Undislike the blog post
  //       await apiDislikeBlog(params.bid, false); // Truyền false để chỉ đánh dấu bài đăng không được không thích
  //       setDislikes(dislikes - 1);
  //     } else {
  //       // Dislike the blog post
  //       await apiDislikeBlog(params.bid, true); // Truyền true để chỉ đánh dấu bài đăng được không thích
  //       setDislikes(dislikes + 1);
  //       if (hasLiked) {
  //         // If user liked before, remove like
  //         setLikes(likes - 1);
  //         setHasLiked(false);
  //       }
  //     }
  //     setHasDisliked(!hasDisliked);
  //     dispatch(getCurrentBlog());
  //   } catch (error) {
  //     console.error('Error disliking/liking blog:', error);
  //   }
  // };

  useEffect(() => {
    getBlog();
  }, [params.bid]);

  // console.log({ likes, dislikes, hasLiked, hasDisliked });

  return (
    <div className="w-full select-none">
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase">{detailBlog?.title}</h3>
          <BreadCrumb title={detailBlog?.title} category={detailBlog.category} />
        </div>
      </div>
      <div className="w-main justify-between mt-8 m-auto gap-4">
        <span className="px-3 font-semibold">
          {detailBlog?.author + '  -  ' + moment(detailBlog?.createdAt).format('MMM DD,YYYY') + '   -   ' + detailBlog.numberView + ' (Views)'}
        </span>
        <img src={detailBlog?.image} alt="detailBlog" className="object-contain w-full py-4" />
        <p className="py-4">{detailBlog?.description}</p>
      </div>
      {/* <div className="flex justify-between w-main m-auto ">
        <div className="flex items-center gap-10">
          <span className="flex text-xl py-4 gap-4 items-center justify-center">
            <Button style={clsx('bg-white text-black')} handleOnClick={handleLike}>
              <FaThumbsUp size={28} color={hasLiked ? 'blue' : 'black'} />
            </Button>
            <span>{likes}</span>
          </span>
          <span className="flex text-lg gap-4">
            <Button style={clsx('bg-white text-black')} handleOnClick={handleDislike}>
              <FaThumbsDown size={28} color={hasDisliked ? 'red' : 'black'} />
            </Button>
            <span>{dislikes}</span>
          </span>
        </div>
      </div> */}
      <div className="flex justify-end items-center gap-2 w-main m-auto" onClick={() => history.back()}>
        <label className="flex justify-center items-center gap-2 hover:text-main cursor-pointer">
          <FaLongArrowAltLeft />
          Back To Blog
        </label>
      </div>

      <div className="w-full h-[100px]"></div>
    </div>
  );
};

export default withBase(DetailBlog);
