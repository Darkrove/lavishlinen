import { GetServerSideProps, NextPage } from "next";
import client from "@/lib/commerce";
import LargeHeading from "@/ui/large-heading";
import { Separator } from "@/ui/seperator";
import ProductList from "@/components/product-list";
import NoProduct from "@/components/no-product";

interface ProductProps {
  category: any;
  products: any;
}

const Product: NextPage<ProductProps> = ({ category, products }) => {
  if (!products || products.length === 0) {
    return <NoProduct />;
  }
  return (
    <div>
      <LargeHeading size="xs">{category.name}</LargeHeading>
      <Separator className="my-4" />
      <ProductList products={products} />
    </div>
  );
};

export default Product;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params;
  const category = await client.categories.retrieve(slug as string, {
    type: "slug",
  });
  const { data: products } = await client.products.list({
    category_slug: [slug as string],
  });
  return {
    props: {
      category,
      products,
    },
  };
};
