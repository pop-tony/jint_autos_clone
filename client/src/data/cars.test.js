import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';
import { INITIAL_CARS } from './cars.js';

test('Instagram vehicle features have unique IDs and clearly marked contact-only details', () => {
  const ids = INITIAL_CARS.map(({ id }) => id);
  const publicDir = new URL('../../public/', import.meta.url);

  assert.equal(INITIAL_CARS.length, 8);
  assert.equal(new Set(ids).size, ids.length);

  for (const car of INITIAL_CARS) {
    assert.ok(car.name);
    assert.ok(car.model);
    assert.equal(car.year, null);
    assert.equal(car.price, null);
    assert.match(car.mainImage, /^\/instagram\/.+\.jpg$/);
    assert.ok(car.gallery.length >= 1);
    assert.match(car.description, /confirm the exact model, specification, price and current availability/);
    assert.ok(existsSync(new URL(car.mainImage.slice(1), publicDir)), `Missing photo asset: ${car.mainImage}`);
    assert.match(car.instagramPost, /^https:\/\/www\.instagram\.com\/accelerenmotorsghltd\//);
  }
});
