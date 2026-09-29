import { Service } from '@angular/core';

export interface Product {
  id : string;
  name : string;
  description : string;
  price : number;
  imageUrl : string;
  category : string;
  sellerName : string;
}

@Service()
export class Productservice {
    products: Product[] = [
    {
      id: '1',
      name: 'Speaker',
      description: 'Android speaker which can be connected to bluetooth.',
      price: 1000.00,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_toa6VIVS7WpCXWcUkZVY8-ogiToO8r0kcQp-7vLfomKtb4jpjETQVT5Gk56P5NGjQ9xoNJ6EmQqjNlaO6tEAX-Tt0kiVY6htqJdd3_CE6LG6_5QWF8bbourxdN4usWo4mgjIbBaUoY0g5wJxnD7EwnBgoyUPlIrT1gM14jbRHKbJ-oTxPZsSIqOxy1b6XXpM0HbBDBQFhAIFqYUQixxHU3se08asMAEfBvNnB0jhT0XkPVBDf3c6Vw',
      category : 'Electronics',
      sellerName : 'Boat'  
    },
    {
      id: '2',
      name: 'Watch',
      description: 'Black analog watch',
      price: 4000.00,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6RpppUNk97dBYPcPbPVSg2sXk0nwDym7Nt9NrOXvpbMpC2w9b3PjqDxA6_4JS9YBbZXOWKqHSfHvOaEOb-Lh_fLXGFhAsiI0WtB0a5Ge7dAFBDqpL0N9Pv5jrlNz7GlRJoLPt6szSZ08N62ulEYFAmoLUdLSrctPszWEsk3KNbF6nH9jy4QJDaewp_2JKMz3nnXlSuUhryIsNW-aUt-y7il4q0SBiOBsna6BV8NJA_3jT3Fm2stAkUA',
      category : 'Fashion',
      sellerName : 'Casio' 
    },
    {
      id: '3',
      name: 'Pen holder',
      description: 'Solid cast iron pen holder',
      price: 100.00,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClpGu73tRIke2mRKe8t3XBz-E4lewfZAXgsxqBt0CQwK-0jd_sqcI4Vgm_5ZNwD_c6AVEY6pEFWOmHOW2YW8vwEdhZWpIUlKVmV7_YXjVA-qgSc3hyaEEaNMw-TKc7zBTNDzIJjHP8ln1WbK-a1RGCAK5Oxe0SURhmaLTJk9pIEWp28ZoAvsBHl5e2gwI84_M3WOn3OFtT7B5xmwQPz1d9v1HhkB3VlbAV6Z4qNYWLiEo5d4K3jjo8sQ',
      category : 'Home & Living',
      sellerName : 'Navneet' 
    },
    {
      id: '4',
      name: 'Ceramic Vessel',
      description: 'Ceramic storage container',
      price: 600.00,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFJBJQvlqFWJp_g52lGSplfqTn3jyE3LRR7ZIf-PQCzYW9byaMoEPLSHZlyTMAuL7po3CcLopfdhA51jVN05QS0ekXdvWuipFo1goFmqHiStEYb36RzqSDvsvHiqLkGzgJIdA8-UHhD9usvIv65ItF9jaKe7eKiMdHzwZVkxNgUy5IVjGob7fEv61WWcm64FxLdogpfZcERrvXY34z7QQ36GUOyXvZwl4q-cSTl2Q8zR_86JqwBRoEcA',
      category : 'Home & Living',
      sellerName : 'Navneet' 
    },
    {
      id: '5',
      name: 'Foldable lamp',
      description: 'Foldable LED lamp',
      price: 250.00,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSqfi7iwhKhcJnjmC4nXHxc3ab-3mBmi_ShhI_f5yLnIZLrcSLXaASNJGqireLfoaQj6C-FT779ZLtLHqchnxGQa7iswIBhG1j1LhfB-gcIoKKCVG1wd2hW6n9r96SCr2PnHsxWJZ5nfPq0AlbO_yPB-speSgxXmGA9p3b_a_24M38N2D_TWjaCcDKMm0i9HmtqHgAINwnJ2y4cBvKSYQ77rxVDMhb4a_GXVlqtEn27K7lKPhBkch5dQ',
      category : 'Electronics',
      sellerName : 'Havells' 
    },
    {
      id: '6',
      name: 'Headphones',
      description: 'White',
      price: 999.00,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDStuLX5H7vtDY0o29RY3c6nS3I2Emdel7rab6CQCaJk5N7kIzTNfKZeoW7Ao_mCsZ_DbckU05rmElPStHgxNy-uCZEQcDcrDRf1-ma1DHMuO7n5kNQc0QDrnOHppn-dDge3xlzP76Rz-mo5cJgWve_-04CQHiVeb-52zopuFAXgrJpVN6Nyvoug9ArrSNZ-UAUjNCIAI6OQh2NkJK4Vd-FuCdbABTryp4IpYzXD9TlOxBVHECrM16O4w',
      category : 'Electronics',
      sellerName : 'Boat' 
    }
  ];

  getProducts() : Product[] {
    return this.products;
  }

  getProductById(id : string) : Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
