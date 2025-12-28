Feature: Manage Orders in Shopping Portal

  @smoke @regression @p1
  Scenario: Verify products are present in product catalog page
    Given User is on the product catalog page
    When User view the list of products
    Then User should see all available products displayed

  @regression @p2
  Scenario: Verify user can add products to cart
    Given User is on the product catalog page
    When User adds a "Business Laptop1" product to the cart
    Then The product "Business Laptop" should be added to the cart successfully

  @regression @p3 @parameterisation
  Scenario Outline: Verify user can add products to cart using parameterisation
    Given User is on the product catalog page
    When User adds a "<productName>" product to the cart
    Then The product "<productName>" should be added to the cart successfully
    # And User clicks on checkout button to proceed to checkout page
    # Then User should be navigated to the checkout page successfully
    # And User fills in the checkout details and places the order "<customerName>", "<address>", "<paymentMethod>"
    # Then User should see the order confirmation message

    Examples:
      | productName     | customerName | address           | paymentMethod |
      | Business Laptop | John Doe     | 123 Main Street   | Credit Card   |
      | 4K Monitor      | Jane Smith   | 456 Oak Avenue    | Debit Card    |
      | Desk Lamp       | Bob Johnson  | 789 Pine Road     | PayPal        |
    # Scenario: Verify user can remove the product added to cart
    # Scenario: Verify user can update the quantity of products in cart
    # Scenario: Verify user can proceed to checkout from cart page
    # Scenario: Verify user can place an order successfully
