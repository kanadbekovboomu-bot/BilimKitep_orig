import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { RentCalculator } from '../components/modules/RentCalculator';
import { BurgerMenu } from '../components/layout/BurgerMenu';
import { BookPreviewModal } from '../components/modules/BookPreviewModal';
import { ThemeProvider } from '../context/ThemeContext';
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

    expect(screen.getByText(/Rental Calculator|Калькулятор аренды|калькулятору/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /mo|мес|ай/i }).length).toBeGreaterThanOrEqual(3);

    const rentBtn = screen.getByRole('button', { name: /Rent for|Арендовать на|ижара/i });
    fireEvent.click(rentBtn);
    expect(handleRentSubmit).toHaveBeenCalled();
  });

  it('renders BurgerMenu as a modal window with dialog role and handles close', () => {
    const handleClose = vi.fn();
    const handleLogout = vi.fn();

    render(
      <ThemeProvider>
        <MemoryRouter>
          <BurgerMenu
            isOpen={true}
            onClose={handleClose}
            cartCount={3}
            user={{ name: 'Тестовый Пользователь', email: 'test@bilimkitep.kg', role: 'USER' }}
            onLogout={handleLogout}
          />
        </MemoryRouter>
      </ThemeProvider>
    );

    // Verify modal dialog accessibility role
    const dialog = screen.getByRole('dialog', { name: /Навигационное меню/i });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');

    // Verify user info inside modal
    expect(screen.getByText('Тестовый Пользователь')).toBeInTheDocument();
    expect(screen.getByText('test@bilimkitep.kg')).toBeInTheDocument();
    expect(screen.getAllByText('3').length).toBeGreaterThanOrEqual(1);

    // Verify close button triggers onClose
    const closeBtn = screen.getByLabelText('Close menu');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);

    // Verify backdrop click triggers onClose
    const backdrop = screen.getByTestId('burger-menu-backdrop');
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalledTimes(2);
  });

  it('renders BookPreviewModal with 5 interactive pages and navigates through pages', () => {
    const handleClose = vi.fn();
    const handleAddToCart = vi.fn();
    const sampleBook = {
      id: 'b_101',
      title: 'Геометрия 8-класс',
      author: 'И. Б. Бекбоев',
      subject: 'Геометрия',
      grade: 8,
      language: 'KG',
      price: 320,
      rentPricePerMonth: 40,
    };

    render(
      <BookPreviewModal
        book={sampleBook}
        isOpen={true}
        onClose={handleClose}
        onAddToCart={handleAddToCart}
      />
    );

    // Page 1: Title page (title in header and on paper)
    expect(screen.getAllByText('Геометрия 8-класс').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/И. Б. Бекбоев/i).length).toBeGreaterThanOrEqual(1);

    // Next page -> Page 2: Table of Contents
    const nextBtn = screen.getByRole('button', { name: /Алга/i });
    fireEvent.click(nextBtn);
    expect(screen.getByText(/МАЗМУНУ|ОГЛАВЛЕНИЕ/i)).toBeInTheDocument();

    // Quick jump to page 5
    const page5Btn = screen.getByRole('button', { name: 'Перейти на страницу 5' });
    fireEvent.click(page5Btn);
    expect(screen.getByText(/Ознакомительный фрагмент завершён/i)).toBeInTheDocument();

    // Click rent from preview
    const rentBtn = screen.getByRole('button', { name: /Взять в аренду/i });
    fireEvent.click(rentBtn);
    expect(handleAddToCart).toHaveBeenCalledWith(sampleBook, 'RENT', 9);
    expect(handleClose).toHaveBeenCalled();
  });
});
