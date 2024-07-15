import { RootLayout } from "@/layouts";
import { Shared } from "@/components/Shared";

export default function SinglePost(props) {
  console.log("SinglePost props: ", props);
  return (
    <>
      <Shared.Seo />
      <RootLayout>
        <h2>Single Post</h2>
      </RootLayout>
    </>
  );
}
