import '@testing-library/jest-dom';

global.fetch = jest.fn();

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
    console.error.mockRestore();
    console.warn.mockRestore();
    fetch.mockClear();
});