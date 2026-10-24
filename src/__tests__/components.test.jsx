import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { RentCalculator } from '../components/modules/RentCalculator';
import '../i18n';

describe('Common UI Components rendering & interaction', () => {
  it('renders Button with variants and handles clicks', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Купить книгу</Button>);

    const btn = screen.getByRole('button', { name: /Купить книгу/i });
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders Badge with custom text', () => {
    render(<Badge variant="rent">Ижара 9 ай</Badge>);
    expect(screen.getByText('Ижара 9 ай')).toBeInTheDocument();
  });

  it('renders Modal when isOpen is true and triggers onClose', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Тестовое окно">
        <p>Содержимое модалки</p>
      </Modal>
    );

    expect(screen.getByText('Тестовое окно')).toBeInTheDocument();
    expect(screen.getByText('Содержимое модалки')).toBeInTheDocument();

    const closeBtn = screen.getByLabelText('Close modal');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders RentCalculator with rental breakdown and handles submit', () => {
    const handleRentSubmit = vi.fn();
    const sampleBook = {
      id: 'b_101',
      title: 'Геометрия 8-класс',
      rentPricePerMonth: 40,
      deposit: 150,
      price: 320,
      dealType: 'RENT',
    };

    render(
      <RentCalculator
        book={sampleBook}
        onRentSubmit={handleRentSubmit}
      />
    );

    expect(screen.getByText(/Rental Calculator|Калькулятор аренды/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /ай/i }).length).toBeGreaterThanOrEqual(3);

    const rentBtn = screen.getByRole('button', { name: /Rent for|Арендовать на/i });
    fireEvent.click(rentBtn);
    expect(handleRentSubmit).toHaveBeenCalled();
  });
});
