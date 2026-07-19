import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product Name", 100);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "Updated Product",
      price: 150,
    };

    const output = {
      id: "123",
      name: "Updated Product",
      price: 150,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should throw an error when name is empty", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "",
      price: 150,
    };

    await expect(usecase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is negative", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "Updated Product",
      price: -50,
    };

    await expect(usecase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
