import { useState, useEffect } from "react";
import "tw-elements";
import { useAuth } from "../../context/AuthContext";
import ProImgModal1 from "./ProImgModal1";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import ProfilePic from "../../image/profileImg.png";
import { useLocation, useParams } from "react-router-dom";

function ProfileImg() {
	const [providerPics, setProviderPics] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const { input, user, pics, getProfileImages, myOrderImages } = useAuth();
	const { id } = useParams();
	const { pathname } = useLocation();

	const otherOrderImages = providerPics.sort((a, b) => b.isShow - a.isShow);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		const fetchProviderPics = async () => {
			try {
				const res = await getProfileImages(id);
				setProviderPics(res.data.profileImages);
			} catch (err) {
				console.log(err);
			}
		};
		fetchProviderPics();
	}, [id]);

	return (
		<>
			{user?.id == id ||
			pathname == "/pending" ||
			pathname == "/upcoming" ||
			pathname == "/completed" ||
			pathname == "/wallethistory" ? (
				pics.length ? (
					<div className="w-[500px]">
						<Swiper
							breakpoints={{
								1280: {
									slidesPerView: 1,
									spaceBetween: 1,
									slidesPerGroup: 1
								},
								1440: {
									slidesPerView: 1,
									spaceBetween: 1,
									slidesPerGroup: 1
								}
							}}
							loop={true}
							modules={[Pagination, Navigation]}
						>
							{user.id === +id || id === undefined
								? myOrderImages.map((item, index) => {
										return (
											<SwiperSlide className="w-[500px] " key={index}>
												<div
													className="flex flex-col  justify-center overflow-hidden"
													onClick={openModal}
												>
													<img
														src={item.Image}
														alt="..."
														className="block w-96 h-60 object-contain"
													/>
												</div>
											</SwiperSlide>
										);
								  })
								: otherOrderImages.map((item, index) => {
										return (
											<SwiperSlide className="w-[500px] " key={index}>
												<div
													className="flex flex-col  justify-center overflow-hidden"
													onClick={openModal}
												>
													<img
														src={item.Image}
														alt="..."
														className="block w-96 h-60 object-contain"
													/>
												</div>
											</SwiperSlide>
										);
								  })}
						</Swiper>
						<ProImgModal1
							isOpen={isOpen}
							closeModal={closeModal}
							input={input}
							getProfileImages={getProfileImages}
							user={user}
						/>
					</div>
				) : (
					<div className="w-[500px]">
						<img
							src={ProfilePic}
							className="w-96 h-60 object-contain"
							onClick={openModal}
						/>
						<ProImgModal1
							isOpen={isOpen}
							closeModal={closeModal}
							input={input}
							getProfileImages={getProfileImages}
							user={user}
						/>
					</div>
				)
			) : providerPics.length ? (
				<div className="w-[500px]">
					<Swiper
						breakpoints={{
							1280: {
								slidesPerView: 1,
								spaceBetween: 1,
								slidesPerGroup: 1
							},
							1440: {
								slidesPerView: 1,
								spaceBetween: 1,
								slidesPerGroup: 1
							}
						}}
						loop={true}
						modules={[Pagination, Navigation]}
					>
						{providerPics.map((item, index) => {
							return (
								<SwiperSlide className="w-[500px]" key={index}>
									<div className="flex flex-col justify-center overflow-hidden">
										<img
											src={item.Image}
											alt="..."
											className="block w-96 h-60 object-contain"
										/>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
					<ProImgModal1
						isOpen={isOpen}
						closeModal={closeModal}
						input={input}
						getProfileImages={getProfileImages}
						user={user}
					/>
				</div>
			) : (
				<>
					<img src={ProfilePic} className="w-96 h-60 object-contain" />
					<ProImgModal1
						isOpen={isOpen}
						closeModal={closeModal}
						input={input}
						getProfileImages={getProfileImages}
						user={user}
					/>
				</>
			)}
		</>
	);
}

export default ProfileImg;
