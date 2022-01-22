
import { Button, Image, AspectRatio, Avatar } from "@chakra-ui/react";
import Head from "next/head";
import {
	AiFillHeart,
	AiFillWallet,
	AiOutlineArrowDown,
	AiOutlineArrowLeft,
	AiOutlineArrowRight,
} from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import Card from "../components/Card";
import Layout from "../components/layouts/Default";
import Section from "../components/Section";
export default function Home() {
	return (
		<Layout>
			<Head>
				<title>Amuze</title>
				<meta name="description" content="Amuze-Museum at your fingertips" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Section delay={0.2}>
				<section className="overflow-hidden text-white">
					<div className="flex flex-wrap mx-auto">
						<div className="flex flex-col w-full gap-6 p-20 pt-40 lg:w-1/2">
							<h1 className="mb-4 text-3xl font-bold sm:text-5xl">
								Museum Tours At Your{" "}
								<span className="text-yellow-300">Fingertips</span>
							</h1>
							<p className="mb-4 text-gray-500">
								A-MUZE is the world’s first museum-tour focused decentralised
								application aimed to preserve and spread awareness of global
								heritage through a unique museum experience at the comfort of
								your own home.
							</p>
							<div className="flex py-2">
								<Button
									className="flex px-6 py-2 text-black border-0 rounded focus:outline-none "
									rounded={"3xl"}
									colorScheme="yellow">
									Launch Application
								</Button>
							</div>
						</div>
						<Image
							alt="hero"
							className="object-cover object-center w-full lg:w-1/2"
							src="/homePageL.svg"
							style={{ "maxHeight": "80vh" }}
						/>
						<div className="relative flex -mb-16 -top-32 left-1/2">
							<a className="flex items-center justify-center w-16 h-16 p-0 -ml-8 text-black bg-yellow-400 border-8 border-gray-700 rounded-full" href="#museums">
								<AiOutlineArrowDown size={35} />
							</a>
						</div>
					</div>
				</section>
				<section className="relative flex w-full h-48 px-8 bg-gray-200">
					<Image src="/brands.svg" layout="fill" alt="brands" />
				</section>
				<section className="text-black bg-white" id="museums">
					<div className="container px-5 py-12 mx-auto">
						<div className="mb-20 text-center">
							<h1 className="mb-4 text-2xl font-bold sm:text-3xl">
								VIEW TOP MUSEUMS AROUND THE WORLD
							</h1>
							<p className="mx-auto text-base leading-relaxed xl:w-2/4 lg:w-3/4 text-gray-500s">
								From the museums in a small island in Seychelles, to the
								buzzling city of London, experience them all here at AMUZE.
							</p>
							<div className="flex justify-center mt-6">
								<div className="p-4 bg-yellow-300 rounded-full">
									Recommended | Top Rated | New
								</div>
							</div>
						</div>
						<div className="flex flex-wrap -mx-4 -mt-4 -mb-10 space-y-6 sm:-m-4 md:space-y-0">
							<div className="flex flex-col items-center p-4 md:w-1/3">
								<Card
									imgUrl="/london.png"
									title="Museum of London"
									description="From prehistoric to modern times, hear the greatest stories from ..."
								/>
							</div>
							<div className="flex flex-col items-center p-4 md:w-1/3">
								<Card />
							</div>
							<div className="flex flex-col items-center p-4 md:w-1/3">
								<Card
									title="Cambodia National Museum"
									description="Cambodia's largest museum of cultural history and..."
									imgUrl="/cambodia.png"
								/>
							</div>
						</div>
						<button className="flex px-8 mx-auto mt-8 text-lg text-indigo-500 border-0 rounded focus:outline-none hover:text-indigo-700">
							View All
						</button>
					</div>
				</section>
				<section className="text-black bg-white">
					<div className="container px-5 py-12 mx-auto">
						<div className="flex">
							<h1 className="mb-4 ml-4 text-2xl font-bold sm:text-3xl">
								VIEW PIECES FROM AROUND THE WORLD
							</h1>
							<p className="mx-auto text-base leading-relaxed xl:w-2/4 lg:w-3/4 text-gray-500s">
								Within each museum, curated tours involving various NFT
								artefacts are presented to you which you may then read or hear
								about.{" "}
							</p>
							<div className="flex items-center justify-center gap-2 pl-12 pr-4">
								<AiOutlineArrowLeft
									size={40}
									className="p-2 border rounded-full"
								/>
								<AiOutlineArrowRight
									size={40}
									className="p-2 text-white bg-black border rounded-full"
								/>
							</div>
						</div>
						<div className="flex flex-wrap -mx-4 -mt-4 -mb-10 space-y-6 sm:-m-4 md:space-y-0">
							<div className="flex flex-col items-center p-4 md:w-1/3">
								<Card
									imgUrl="/robe.svg"
									title="Qing Dynasty Emperor Robe"
									description="Museum: Singapore National Museum Tour: Chinese Influence on Singa..."
									label="Learn more about it for"
								/>
							</div>
							<div className="flex flex-col items-center p-4 md:w-1/3">
								<Card
									imgUrl="/silver.svg"
									title="Yuan Dynasty Silver Budd.."
									description="Museum: Singapore National Museum Tour: Chinese Influence on Singa..."
									label="Learn more about it for"
								/>
							</div>
							<div className="flex flex-col items-center p-4 md:w-1/3">
								<Card
									imgUrl="/vase.png"
									title="Han Dynasty Rose of ..."
									description="Museum: Singapore National Museum Tour: Chinese Influence on Singa..."
									label="Learn more about it for"
								/>
							</div>
						</div>
					</div>
				</section>
				<section className="bg-white">
					<div className="container flex flex-wrap px-5 py-24 mx-auto">
						<div className="w-full mb-10 overflow-hidden text-center rounded-lg lg:w-1/2 lg:mb-0">
							<h1 className="mb-4 ml-4 text-2xl font-bold text-left sm:text-3xl">
								RENT AN NFT FOR A MUSEUM TOUR
							</h1>
							<p className="mb-4 ml-4 text-left">
								Have an NFT that you don’t mind letting the world see? Why not
								share it with the world!
							</p>
							<Image
								alt="feature"
								className="object-cover object-center"
								src="/world.svg"
								width={600}
								height={300}
								layout="responsive"
							/>
						</div>
						<div className="flex flex-col flex-wrap text-center lg:py-6 lg:w-1/2 lg:pl-12 lg:text-left">
							<div className="flex items-center mb-10 lg:items-around">
								<div className="inline-flex items-center justify-center p-3 mr-2 text-indigo-500 bg-indigo-100 rounded-full">
									<AiFillWallet size={25} />
								</div>
								<div className="flex-grow">
									<h2 className="mb-3 text-lg font-bold text-gray-900 title-font">
										SECURE RENTING PROCESS
									</h2>
									<p className="">
										Through our smart contract and multi-sig wallet approach,
										renting NFTs is a breeze!
									</p>
								</div>
							</div>
							<hr className="mb-10" />
							<div className="flex items-center mb-10">
								<div className="items-center justify-center p-3 mr-2 text-yellow-500 bg-yellow-100 rounded-full">
									<IoIosPeople size={25} />
								</div>
								<div className="flex-grow">
									<h2 className="mb-3 text-lg font-bold text-gray-900 title-font">
										EARN REWARDS
									</h2>
									<p className="">
										If your Artefact gets selected as part of a museum tour,
										earn MUZE for the duration of lending!
									</p>
								</div>
							</div>
							<hr className="mb-10" />
							<div className="flex items-center mb-10lg:items-start">
								<div className="items-center justify-center p-3 mr-2 text-indigo-500 bg-indigo-100 rounded-full">
									<AiFillHeart size={25} />
								</div>
								<div className="flex-grow">
									<h2 className="mb-3 text-lg font-bold text-gray-900 title-font">
										INCREASE AWARENESS
									</h2>
									<p className="">
										Displayed infront of curious eyes, your Artefact’s story and
										origins will be learned by many!
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="bg-white" id="how-it-works">
					<div className="container px-5 mx-auto">
						<div className="flex">
							<div className="flex flex-col mb-4">
								<h1 className="mb-4 ml-4 text-2xl font-bold sm:text-3xl">
									HOW IT WORKS
								</h1>
								<p className="w-1/4 mx-auto ml-4 lg:w-3/4">
									Start by simplying swapping ETH for MUZE tokens on our liquidity pool and purchase a ticket to start viewing! After completing your museum tour, receive a unique post card as a souvenir!
								</p>
							</div>
							<div className="flex items-center justify-center text-indigo-500 w-80">
								Learn More <AiOutlineArrowRight />
							</div>
						</div>
						<div className="flex flex-wrap text-center">
							<div className="px-4 mb-10 sm:w-2/3">
								<div className="h-auto overflow-hidden rounded-lg">
									<AspectRatio maxW='760px' ratio={2}>
										<iframe width="760" height="500" src="https://www.youtube.com/embed/wZQBYstPuQo" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
									</AspectRatio>
								</div>
							</div>
							<div className="mb-10 bg-indigo-400 sm:w-1/3">
								<div className="overflow-hidden">
									<Image alt="user flow" className="object-contain object-center w-full h-full" src="/userFlow.svg" />
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="bg-gray-200">
					<div className="container flex flex-wrap px-5 py-24 mx-auto">
						<div className="flex flex-wrap -m-4">
							<div className="p-4 lg:w-1/2 md:w-full">
								<div className="flex p-8 border-2 border-gray-200 border-opacity-50 rounded-lg sm:flex-row">
									<div className="flex-grow p-4 bg-white rounded-xl">
										<Avatar name='David' src='/david.svg' className="p-2 ml-4 bg-white -top-10" bg='gray.100' size='lg' />
										<h2 className="mb-3 text-lg font-bold text-gray-900">David (0x7eF...929)</h2>
										<Image src="/stars.svg" alt="rating" className="my-2" />
										<p className="mb-4">“If you have a keen interest in understanding facts, evidences, and the history of the Khmer people from pre-Khmer Empire, Chinese extracts of Thai/  ... “</p>
										<a className="inline-flex items-center mt-3 text-indigo-500">Read More
										</a>
									</div>
								</div>
							</div>
							<div className="p-4 lg:w-1/2 md:w-full">
								<div className="flex flex-col p-8 border-2 border-gray-200 border-opacity-50 rounded-lg sm:flex-row">
									<div className="flex-grow">
										<h2 className="mb-3 text-3xl font-bold text-gray-900">Reviews from our A-MAZEING viewers</h2>
										<p className="text-base leading-relaxed">Write a review and earn MUZE tokens! Learn how to do so <a className="inline-flex items-center mt-3 text-indigo-500">here
										</a></p>

									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Section>
		</Layout>
	);
}
