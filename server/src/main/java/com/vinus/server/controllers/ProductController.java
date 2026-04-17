package com.vinus.server.controllers;

import com.vinus.server.entities.Product;
import com.vinus.server.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> obtenerTodos() {
        return productRepository.findAll();
    }

    @PostMapping
    public Product crear(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PatchMapping("/{id}")
    public Product actualizar(@PathVariable Long id, @RequestBody Product productDetails) {
        Product product = productRepository.findById(id).orElseThrow();
        if (productDetails.getStatus() != null) product.setStatus(productDetails.getStatus());
        return productRepository.save(product);
    }

    @GetMapping("/my-products")
    public List<Product> getMyProducts(@RequestParam String author) {
        return productRepository.findBySellerName(author);
    }
}