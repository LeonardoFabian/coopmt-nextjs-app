import { RootLayout } from "@/layouts";

export default function SinglePage(props) {
  console.log("Page props: ", props);

  return (
    <RootLayout>
      <h2>Page</h2>
    </RootLayout>
  );
}
