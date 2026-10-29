/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';

const RouterContext = createContext({ pathname: '/', params: {}, navigate: () => {} });

function normalizeRoutePath(value) {
  const normalizedValue = String(value ?? '/');
  const pathWithoutHash = normalizedValue.split('#')[0].split('?')[0];
  const sanitized = pathWithoutHash.length > 1 && pathWithoutHash.endsWith('/')
    ? pathWithoutHash.slice(0, -1)
    : pathWithoutHash;

  if (!sanitized || sanitized === '') return '/';
  return sanitized.startsWith('/') ? sanitized : `/${sanitized}`;
}

export function sanitizePhoneNumber(value = '') {
  const raw = String(value ?? '');
  const compact = raw.replace(/[^\d+]/g, '');

  if (!compact) return '';
  if (compact.startsWith('+')) return `+${compact.replace(/\+/g, '')}`;
  return compact;
}

export function sanitizeWhatsAppNumber(value = '') {
  return String(value ?? '').replace(/\D+/g, '');
}

export function buildPhoneHref(value = '') {
  const phone = sanitizePhoneNumber(value);
  return phone ? `tel:${phone}` : '#';
}

export function buildWhatsAppHref(value = '', message = '') {
  const number = sanitizeWhatsAppNumber(value);
  if (!number) return '#';
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

function matchPath(pattern, pathname) {
  const normalizedPattern = normalizeRoutePath(pattern);
  const normalizedPathname = normalizeRoutePath(pathname);

  if (normalizedPattern === '*') return { matched: true, params: {} };
  if (normalizedPattern === '/' && normalizedPathname === '/') return { matched: true, params: {} };

  const pParts = normalizedPattern.split('/').filter(Boolean);
  const pathParts = normalizedPathname.split('/').filter(Boolean);

  if (pParts.length !== pathParts.length) return { matched: false, params: {} };

  const params = {};
  for (let i = 0; i < pParts.length; i += 1) {
    if (pParts[i].startsWith(':')) {
      params[pParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
    } else if (pParts[i] !== pathParts[i]) {
      return { matched: false, params: {} };
    }
  }

  return { matched: true, params };
}

export function BrowserRouter({ children }) {
  const [pathname, setPathname] = useState(() => (typeof window !== 'undefined' ? window.location.pathname : '/'));
  const [params, setParams] = useState({});

  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to) => {
    const nextPath = normalizeRoutePath(to);
    if (nextPath === pathname) return;
    window.history.pushState({}, '', nextPath);
    setPathname(nextPath);
  };

  return (
    <RouterContext.Provider value={{ pathname, params, navigate }}>
      <RouteParamsSetter setParams={setParams} pathname={pathname} />
      {children}
    </RouterContext.Provider>
  );
}

function RouteParamsSetter({ setParams, pathname }) {
  useEffect(() => {
    setParams({});
  }, [pathname, setParams]);

  return null;
}

export function Routes({ children }) {
  const { pathname } = useContext(RouterContext);
  const [currentParams, setCurrentParams] = useState({});

  let matchedElement = null;
  React.Children.forEach(children, (child) => {
    if (matchedElement || !child || !child.props) return;
    const { path, element } = child.props;
    const match = matchPath(path, pathname);
    if (match.matched) {
      matchedElement = element;
      if (JSON.stringify(match.params) !== JSON.stringify(currentParams)) {
        queueMicrotask(() => setCurrentParams(match.params));
      }
    }
  });

  const ctx = useContext(RouterContext);
  const merged = { ...ctx, params: currentParams };

  if (!matchedElement) {
    React.Children.forEach(children, (child) => {
      if (matchedElement) return;
      if (child?.props?.path === '*') matchedElement = child.props.element;
    });
  }

  return <RouterContext.Provider value={merged}>{matchedElement}</RouterContext.Provider>;
}

export function Route() {
  return null;
}

export function Link({ to, children, className, onClick, ...rest }) {
  const { navigate } = useContext(RouterContext);

  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function NavLink({ to, children, className }) {
  const { pathname, navigate } = useContext(RouterContext);
  const normalizedTo = normalizeRoutePath(to);
  const normalizedPathname = normalizeRoutePath(pathname);
  const isActive = normalizedPathname === normalizedTo || (normalizedTo !== '/' && normalizedPathname.startsWith(normalizedTo));
  const cls = typeof className === 'function' ? className({ isActive }) : className;

  return (
    <a
      href={to}
      className={cls}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {typeof children === 'function' ? children({ isActive }) : children}
    </a>
  );
}

export function useLocation() {
  const { pathname } = useContext(RouterContext);
  return { pathname };
}

export function useParams() {
  const { params } = useContext(RouterContext);
  return params;
}

export function useNavigate() {
  const { navigate } = useContext(RouterContext);
  return navigate;
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export function formatGHS(value) {
  if (value === null || value === undefined || value === '') return 'Price on request';
  return `GHS ${Number(value).toLocaleString()}`;
}
