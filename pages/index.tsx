import axios from "axios"
import type { NextPage } from "next"
import Head from "next/head";
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { Video } from '../types';
interface IProps {
  videos: Video[];
}
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Home: NextPage = ({ videos }: IProps) => {
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      <Head>
        <title>Tik Tik - Make Your Day</title>
      </Head>
      {videos.length
        ? videos?.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))
        : <NoResults text={`No Videos`} />}
    </div>
  )
}

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }

  return {
    props: { videos: response.data },
  };
};

export default Home