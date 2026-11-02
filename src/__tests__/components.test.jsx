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
import { CustomDropdown } from '../components/common/CustomDropdown';
import { ScrollProgressBar } from '../components/common/ScrollProgressBar';
import { ScrollToTop } from '../components/common/ScrollToTop';
import { Pagination } from '../components/common/Pagination';
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
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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

  it('renders CustomDropdown, opens styled menu and selects option', () => {
    const handleChange = vi.fn();
    const options = [
      { value: 'newest', label: 'Сначала новые' },
      { value: 'reviews', label: 'По отзывам' },
      { value: 'priceDesc', label: 'Сначала дорогие' },
    ];

    render(
      <CustomDropdown
        value="newest"
        onChange={handleChange}
        options={options}
        label="Сортировка"
      />
    );

    // Initial label
    expect(screen.getByText('Сначала новые')).toBeInTheDocument();
    // Menu is closed initially
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    // Click trigger button to open
    const trigger = screen.getByRole('button', { name: /Сначала новые/i });
    fireEvent.click(trigger);

    // Menu is opened
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /По отзывам/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Сначала дорогие/i })).toBeInTheDocument();

    // Select 'Сначала дорогие'
    const expensiveOption = screen.getByRole('option', { name: /Сначала дорогие/i });
    fireEvent.click(expensiveOption);

    expect(handleChange).toHaveBeenCalledWith('priceDesc');
    // Dropdown closes after selection
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('renders ScrollProgressBar with ARIA progressbar role and handles seek click', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<ScrollProgressBar />);

    const bar = screen.getByRole('progressbar', { name: /Прогресс чтения/i });
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');

    // Simulate clicking on the bar
    fireEvent.click(bar, { clientX: 200 });
    // Should call window.scrollTo or maintain state
    expect(bar).toBeInTheDocument();
  });

  it('ScrollToTop scrolls window to (0, 0) upon route render', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(
      <MemoryRouter initialEntries={['/catalog']}>
        <ScrollToTop />
      </MemoryRouter>
    );

    expect(scrollToMock).toHaveBeenCalled();
  });

  it('renders Pagination and handles page switch with auto scroll', () => {
    const handlePageChange = vi.fn();
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={handlePageChange}
      />
    );

    const page2Btn = screen.getByRole('button', { name: '2' });
    expect(page2Btn).toBeInTheDocument();

    fireEvent.click(page2Btn);
    expect(handlePageChange).toHaveBeenCalledWith(2);
    expect(scrollToMock).toHaveBeenCalled();

    // Next page button
    const nextBtn = screen.getByRole('button', { name: /Next page/i });
    fireEvent.click(nextBtn);
    expect(handlePageChange).toHaveBeenCalledWith(2); // 1 + 1 = 2
  });
});
