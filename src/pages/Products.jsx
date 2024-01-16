const Products = () => {
  const list = [
    {
      id: 1928,
      img: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/kitchen-island-set-300x300.png",
      name: "White Kitchen Island",
      price: "5,350.75",
      category: "Kitchen",
    },
    {
      id: 2002,
      img: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/working-chair-with-armrest-300x300.png",
      name: "Beige Working Chair With Armrest",
      price: "784.00",
      category: "Home Office",
    },
    {
      id: 3229,
      img: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/king-size-master-bedroom-300x300.png",
      name: "King Size Master Bedroom",
      price: "14,500.50",
      category: "Bedroom",
    },
    {
      id: 9735,
      img: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/cream-ceramic-oval-bathtub-300x300.png",
      name: "Ceramic Oval Bathtub",
      price: "11,200.00",
      category: "Bathroom",
    },
    {
      id: 9927,
      img: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/bathroom-wooden-table-300x300.png",
      name: "Bathroom Wooden Table",
      price: "550.00",
      category: "Bathroom",
    },
    {
      id: 6021,
      img: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/wooden-stool-300x300.png",
      name: "Wooden Bath Room Stool",
      price: "220.50",
      category: "Bathroom",
    },
    {
      id: 7098,
      img: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/living-room-green-sofa-300x300.png",
      name: "Green Living Room Sofa",
      price: "1,840.00",
      category: "Living Room",
    },
    {
      id: 8982,
      img: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/bathroom-circle-mirror-300x300.png",
      name: "Bathroom Golden Ring Mirror",
      price: "124.25",
      category: "Bathroom",
    },
    {
      id: 9227,
      img: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/bedroom-single-chair-300x300.png",
      name: "Bedroom Single Chair",
      price: "504.00",
      category: "Bedroom",
    },
    {
      id: 1038,
      img: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/kitchen-furniture-cabinet-300x300.png",
      name: "Kitchen Cabinet",
      price: "1,150.25",
      category: "Cabinet",
    },
    {
      id: 1101,
      img: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/brown-wooden-stool-300x300.png",
      name: "Brown Circle Stool",
      price: "224.00",
      category: "Kitchen",
    },
    {
      id: 1022,
      img: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/single-blue-fabric-chair-1-300x300.png",
      name: "Blue Comfy Fabric Chair",
      price: "580.50",
      category: "Bedroom",
    },
  ];

  return (
    <>
      {" "}
      products page <br />
      {JSON.stringify(list)}
    </>
  );
};

export default Products;
