const CustomerRepo = require('../../repos/customer-repo');
const TestContext = require('../testContext');

let testContext;

beforeAll(async () => {
    testContext = await TestContext.build();

    console.log(
        'Context for customers.two.test is roleName: ',
        testContext.roleName
    );
});

afterAll(() => {
    return testContext.goodBye();
});

it('create a user', async () => {
    // Arrange
    const startingCount = await CustomerRepo.count();
    const params = { username: 'testuser' };

    // Act
    const testUser = await CustomerRepo.insert(params.username);

    const finishCount = await CustomerRepo.count();

    // Assert
    expect(200);
    expect(finishCount).toEqual(startingCount + 1);
});
