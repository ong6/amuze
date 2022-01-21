import Head from "next/head";
import Section from "../components/Section";
import Card from "../components/Card";
import { AiFillHeart, AiFillWallet, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
export default function Home() {
	return (
		<div>
			<Head>
				<title>Amuze</title>
				<meta name="description" content="Amuze-Museum at your fingertips" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Section delay={0.2}>
				<section className="h-72"></section>
				<section className="relative w-full h-48 bg-gray-200">
					<Image src="/brands.svg" layout="fill" alt="brands" />
				</section>
				<section className="text-black bg-white">
					<div className="container px-5 py-12 mx-auto">
						<div className="mb-20 text-center">
							<h1 className="mb-4 text-2xl font-medium sm:text-3xl title-font">VIEW TOP MUSEUMS AROUND THE WORLD</h1>
							<p className="mx-auto text-base leading-relaxed xl:w-2/4 lg:w-3/4 text-gray-500s">From the museums in a small island in Seychelles, to the buzzling city of London, experience them all here at AMUZE.</p>
							<div className="flex justify-center mt-6">
								<div className="p-2 bg-yellow-500 rounded-full">Recommended | Top Rated | New</div>
							</div>
						</div>
						<div className="flex flex-wrap -mx-4 -mt-4 -mb-10 space-y-6 sm:-m-4 md:space-y-0">
							<div className="flex flex-col items-center p-4 md:w-1/3">
								<Card imgUrl="/london.png" title="Museum of London"
									description="From prehistoric to modern times, hear the greatest stories from ..." />
							</div>
							<div className="flex flex-col items-center p-4 md:w-1/3">
								<Card />
							</div>
							<div className="flex flex-col items-center p-4 md:w-1/3">
								<Card title="Cambodia National Museum" description="Cambodia's largest museum of cultural history and..." imgUrl="/cambodia.png" />
							</div>
						</div>
						<button className="flex px-8 mx-auto mt-8 text-lg text-indigo-500 border-0 rounded focus:outline-none hover:text-indigo-700">View All</button>
					</div>
				</section>
				<section className="text-black bg-white">
					<div className="container px-5 py-12 mx-auto">
						<div className="flex">
							<h1 className="mb-4 ml-4 text-2xl font-bold sm:text-3xl">VIEW PIECES FROM AROUND THE WORLD</h1>
							<p className="mx-auto text-base leading-relaxed xl:w-2/4 lg:w-3/4 text-gray-500s">Within each museum, curated tours involving various NFT artefacts are presented to you which you may then read or hear about. </p>
							<div className="flex items-center justify-center gap-2 pl-12 pr-4">
								<AiOutlineArrowLeft size={40} className="p-2 border rounded-full" />
								<AiOutlineArrowRight size={40} className="p-2 text-white bg-black border rounded-full" />
							</div>
						</div>
						<div className="flex flex-wrap -mx-4 -mt-4 -mb-10 space-y-6 sm:-m-4 md:space-y-0">
							<div className="flex flex-col items-center p-4 md:w-1/3">
								<Card imgUrl="/vase.png" title="Han Dynasty Rose of ..." description="Museum: Singapore National Museum Tour: Chinese Influence on Singa..."
									label="Learn more about it for" />
							</div>
							<div className="flex flex-col items-center p-4 md:w-1/3">
								<Card imgUrl="/vase.png" title="Han Dynasty Rose of ..." description="Museum: Singapore National Museum Tour: Chinese Influence on Singa..."
									label="Learn more about it for" />
							</div>
							<div className="flex flex-col items-center p-4 md:w-1/3">
								<Card imgUrl="/vase.png" title="Han Dynasty Rose of ..." description="Museum: Singapore National Museum Tour: Chinese Influence on Singa..."
									label="Learn more about it for" />
							</div>
						</div>
					</div>
				</section>
				<section className="bg-white">
					<div className="container flex flex-wrap px-5 py-24 mx-auto">
						<div className="w-full mb-10 overflow-hidden text-center rounded-lg lg:w-1/2 lg:mb-0">
							<h1 className="mb-4 ml-4 text-2xl font-bold text-left sm:text-3xl">RENT AN NFT FOR A MUSEUM TOUR</h1>
							<p className="ml-4 text-left ">Have an NFT that you don’t mind letting the world see? Why not share it with the world!</p>
							<Image alt="feature" className="object-contain object-center" src="/world.svg" width={150} height={120} layout="responsive" />
						</div>
						<div className="flex flex-col flex-wrap text-center lg:py-6 lg:w-1/2 lg:pl-12 lg:text-left">
							<div className="flex items-center mb-10 lg:items-around">
								<div className="inline-flex items-center justify-center p-3 mr-2 text-indigo-500 bg-indigo-100 rounded-full">
									<AiFillWallet size={25} />
								</div>
								<div className="flex-grow">
									<h2 className="mb-3 text-lg font-medium text-gray-900 title-font">SECURE RENTING PROCESS</h2>
									<p className="">Through our smart contract and multi-sig wallet approach, renting NFTs is a breeze!</p>
								</div>
							</div>
							<hr className="mb-10" />
							<div className="flex items-center mb-10">
								<div className="items-center justify-center p-3 mr-2 text-yellow-500 bg-yellow-100 rounded-full">
									<IoIosPeople size={25} />
								</div>
								<div className="flex-grow">
									<h2 className="mb-3 text-lg font-medium text-gray-900 title-font">EARN REWARDS</h2>
									<p className="">If your Artefact gets selected as part of a museum tour, earn MUZE for the duration of lending!</p>
								</div>
							</div>
							<hr className="mb-10" />
							<div className="flex items-center mb-10lg:items-start">
								<div className="items-center justify-center p-3 mr-2 text-indigo-500 bg-indigo-100 rounded-full">
									<AiFillHeart size={25} />
								</div>
								<div className="flex-grow">
									<h2 className="mb-3 text-lg font-medium text-gray-900 title-font">INCREASE AWARENESS</h2>
									<p className="">Displayed infront of curious eyes, your Artefact’s story and origins will be learned by many!</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Section>
		</div>
	);
}
