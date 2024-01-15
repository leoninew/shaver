import { describe, test, expect } from 'vitest'
import check from '../check'

describe('check', () => {

    test('isArray', () => {
        expect(check.isArray(undefined)).toBe(false);
        expect(check.isArray(null)).toBe(false);
        expect(check.isArray(true)).toBe(false);
        expect(check.isArray(12)).toBe(false);
        expect(check.isArray(Number(12))).toBe(false);
        expect(check.isArray('str')).toBe(false);
        expect(check.isArray(new String('str'))).toBe(false);
        expect(check.isArray([])).toBe(true);
        expect(check.isArray(new Date())).toBe(false);
        expect(check.isArray(new Error)).toBe(false);
        expect(check.isArray({})).toBe(false);
    });

    test('isObject', () => {
        expect(check.isObject(undefined)).toBe(false);
        expect(check.isObject(null)).toBe(false);
        expect(check.isObject(true)).toBe(false);
        expect(check.isObject(12)).toBe(false);
        expect(check.isObject(Number(12))).toBe(false);
        expect(check.isObject('str')).toBe(false);
        expect(check.isObject(new String('str'))).toBe(false);
        expect(check.isObject([])).toBe(false);
        expect(check.isObject(new Date())).toBe(false);
        expect(check.isObject(new Error())).toBe(false);
        expect(check.isObject({})).toBe(true);
    });

    test('isPrimitive', () => {
        expect(check.isPrimitive(undefined)).toBe(true);
        expect(check.isPrimitive(null)).toBe(true);
        expect(check.isPrimitive(true)).toBe(true);
        expect(check.isPrimitive(12)).toBe(true);
        expect(check.isPrimitive(Number(12))).toBe(true);
        expect(check.isPrimitive('str')).toBe(true);
        expect(check.isPrimitive(new String('str'))).toBe(true);
        expect(check.isPrimitive([])).toBe(false);
        expect(check.isPrimitive(new Date())).toBe(true);
        expect(check.isPrimitive(new Error())).toBe(false);
        expect(check.isPrimitive({})).toBe(false);
    });
});
