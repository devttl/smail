import { useEffect, useRef, useState } from "react";
import {
	data,
	Link,
	redirect,
	useFetcher,
	useRevalidator,
} from "react-router";
import { commitSession, getSession } from "~/.server/session";
import { AdSlot } from "~/components/AdSlot";
import {
	DEFAULT_LOCALE,
	type Locale,
	resolveLocaleParam,
	stripDefaultLocalePrefix,
	toIntlLocale,
	toLocalePath,
} from "~/i18n/config";
import { getDictionary } from "~/i18n/messages";
import { BASE_URL } from "~/seo.config";
import type { Email, EmailDetail } from "~/types/email";
import { getAdSenseConfig, type AdSenseConfig } from "~/utils/adsense";
import {
	getMailDomainFromAddress,
	getMailDomains,
	isAllowedRecipientAddress,
	isReservedMailboxPrefix,
	normalizeCustomMailboxPrefix,
} from "~/utils/mail-domains";
import { generateCustomEmailAddress, generateEmailAddress } from "~/utils/mail";
import { MAIL_RETENTION_MS } from "~/utils/mail-retention";
import { mergeRouteMeta } from "~/utils/meta";
import type { Route } from "./+types/home";

function getLocaleFromParams(lang: string | undefined): Locale {
	const { locale } = resolveLocaleParam(lang);
	return locale;
}

function formatRefreshTime(timestamp: number, locale: Locale): string {
	return new Date(timestamp).toLocaleTimeString(toIntlLocale(locale), {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "UTC",
	});
}

const SEO_GUIDES_COPY: Record<
	Locale,
	{ title: string; items: Array<{ label: string; path: string }> }
> = {
	en: {
		title: "Popular temporary email guides",
		items: [
			{ label: "24 Hour Temporary Email", path: "/temporary-email-24-hours" },
			{
				label: "Temporary Email No Registration",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Disposable Email for Verification",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Temporary Email for Registration",
				path: "/temporary-email-for-registration",
			},
			{ label: "Online Temporary Email", path: "/online-temporary-email" },
			{
				label: "Open an Inbox by Email Address",
				path: "/blog/direct-email-inbox-link",
			},
		],
	},
	zh: {
		title: "热门临时邮箱指南",
		items: [
			{ label: "24 小时临时邮箱", path: "/temporary-email-24-hours" },
			{ label: "免注册临时邮箱", path: "/temporary-email-no-registration" },
			{ label: "验证码一次性邮箱", path: "/disposable-email-for-verification" },
			{ label: "临时邮箱注册指南", path: "/temporary-email-for-registration" },
			{ label: "在线临时邮箱", path: "/online-temporary-email" },
			{ label: "邮箱地址直达收件箱", path: "/blog/direct-email-inbox-link" },
		],
	},
	es: {
		title: "Guías populares de correo temporal",
		items: [
			{ label: "Correo temporal 24 horas", path: "/temporary-email-24-hours" },
			{
				label: "Correo temporal sin registro",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Correo desechable para verificación",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Correo temporal para registro",
				path: "/temporary-email-for-registration",
			},
			{ label: "Correo temporal online", path: "/online-temporary-email" },
			{
				label: "Abrir un buzón por dirección de email",
				path: "/blog/direct-email-inbox-link",
			},
		],
	},
	fr: {
		title: "Guides populaires d'email temporaire",
		items: [
			{
				label: "Email temporaire 24 heures",
				path: "/temporary-email-24-hours",
			},
			{
				label: "Email temporaire sans inscription",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Email jetable pour vérification",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Email temporaire pour inscription",
				path: "/temporary-email-for-registration",
			},
			{ label: "Email temporaire en ligne", path: "/online-temporary-email" },
			{
				label: "Ouvrir une boîte par adresse email",
				path: "/blog/direct-email-inbox-link",
			},
		],
	},
	de: {
		title: "Beliebte Temp-Mail-Anleitungen",
		items: [
			{
				label: "24-Stunden-Temporäre E-Mail",
				path: "/temporary-email-24-hours",
			},
			{
				label: "Temporäre E-Mail ohne Registrierung",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Wegwerf-E-Mail für Verifizierung",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Temporäre E-Mail für Registrierung",
				path: "/temporary-email-for-registration",
			},
			{ label: "Online-Temporäre E-Mail", path: "/online-temporary-email" },
			{
				label: "Postfach per E-Mail-Adresse öffnen",
				path: "/blog/direct-email-inbox-link",
			},
		],
	},
	ja: {
		title: "人気の一時メールガイド",
		items: [
			{ label: "24時間一時メール", path: "/temporary-email-24-hours" },
			{
				label: "登録不要の一時メール",
				path: "/temporary-email-no-registration",
			},
			{
				label: "認証用使い捨てメール",
				path: "/disposable-email-for-verification",
			},
			{
				label: "登録向け一時メール",
				path: "/temporary-email-for-registration",
			},
			{ label: "オンライン一時メール", path: "/online-temporary-email" },
			{
				label: "メールアドレスから受信箱を開く",
				path: "/blog/direct-email-inbox-link",
			},
		],
	},
	ko: {
		title: "인기 임시 이메일 가이드",
		items: [
			{ label: "24시간 임시 이메일", path: "/temporary-email-24-hours" },
			{
				label: "가입 없는 임시 이메일",
				path: "/temporary-email-no-registration",
			},
			{
				label: "인증용 일회용 이메일",
				path: "/disposable-email-for-verification",
			},
			{
				label: "가입용 임시 이메일",
				path: "/temporary-email-for-registration",
			},
			{ label: "온라인 임시 이메일", path: "/online-temporary-email" },
			{
				label: "이메일 주소로 받은편지함 열기",
				path: "/blog/direct-email-inbox-link",
			},
		],
	},
	ru: {
		title: "Популярные гайды по временной почте",
		items: [
			{
				label: "Временная почта на 24 часа",
				path: "/temporary-email-24-hours",
			},
			{
				label: "Временная почта без регистрации",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Одноразовая почта для верификации",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Временная почта для регистрации",
				path: "/temporary-email-for-registration",
			},
			{ label: "Онлайн временная почта", path: "/online-temporary-email" },
			{
				label: "Открыть ящик по адресу",
				path: "/blog/direct-email-inbox-link",
			},
		],
	},
	pt: {
		title: "Guias populares de email temporário",
		items: [
			{ label: "Email temporário 24 horas", path: "/temporary-email-24-hours" },
			{
				label: "Email temporário sem cadastro",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Email descartável para verificação",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Email temporário para cadastro",
				path: "/temporary-email-for-registration",
			},
			{ label: "Email temporário online", path: "/online-temporary-email" },
			{
				label: "Abrir caixa pelo endereço de email",
				path: "/blog/direct-email-inbox-link",
			},
		],
	},
	ar: {
		title: "أدلة البريد المؤقت الشائعة",
		items: [
			{ label: "بريد مؤقت لمدة 24 ساعة", path: "/temporary-email-24-hours" },
			{
				label: "بريد مؤقت بدون تسجيل",
				path: "/temporary-email-no-registration",
			},
			{
				label: "بريد مؤقت لرموز التحقق",
				path: "/disposable-email-for-verification",
			},
			{ label: "بريد مؤقت للتسجيل", path: "/temporary-email-for-registration" },
			{ label: "بريد مؤقت أونلاين", path: "/online-temporary-email" },
			{
				label: "فتح الصندوق عبر عنوان البريد",
				path: "/blog/direct-email-inbox-link",
			},
		],
	},
};

function getSeoGuides(locale: Locale): {
	title: string;
	items: Array<{ label: string; path: string }>;
} {
	return SEO_GUIDES_COPY[locale] ?? SEO_GUIDES_COPY.en;
}

type SeoNarrative = {
	title: string;
	description: string;
	points: string[];
};

type CustomAddressCopy = {
	button: string;
	title: string;
	description: string;
	prefixLabel: string;
	prefixPlaceholder: string;
	domainLabel: string;
	create: string;
	cancel: string;
	invalidPrefix: string;
	reservedPrefix?: string;
};

const CUSTOM_ADDRESS_COPY: Record<Locale, CustomAddressCopy> = {
	en: { button: "Custom email", title: "Create a custom email", description: "Choose a memorable prefix to create the exact temporary email address you want.", prefixLabel: "Email prefix", prefixPlaceholder: "for example: hello", domainLabel: "Email domain", create: "Create address", cancel: "Cancel", invalidPrefix: "Use 1–32 lowercase letters, numbers, dots, hyphens, or underscores.", reservedPrefix: "This mailbox name is reserved. Choose another prefix." },
	zh: { button: "自定义邮箱", title: "创建自定义邮箱", description: "设置容易记住的前缀，创建你想要的完整临时邮箱地址。", prefixLabel: "邮箱前缀", prefixPlaceholder: "例如：hello", domainLabel: "邮箱域名", create: "创建邮箱", cancel: "取消", invalidPrefix: "请输入 1–32 位字母、数字、点、短横线或下划线。", reservedPrefix: "该邮箱名称属于系统保留名称，请更换前缀。" },
	es: { button: "Correo personalizado", title: "Crear correo personalizado", description: "Elige un prefijo fácil de recordar para crear la dirección temporal exacta que deseas.", prefixLabel: "Prefijo", prefixPlaceholder: "por ejemplo: hola", domainLabel: "Dominio", create: "Crear dirección", cancel: "Cancelar", invalidPrefix: "Usa entre 1 y 32 letras, números, puntos, guiones o guiones bajos.", reservedPrefix: "Este nombre de buzón está reservado. Elige otro prefijo." },
	fr: { button: "Email personnalisé", title: "Créer un email personnalisé", description: "Choisissez un préfixe mémorable pour créer l’adresse temporaire exacte souhaitée.", prefixLabel: "Préfixe", prefixPlaceholder: "par exemple : bonjour", domainLabel: "Domaine", create: "Créer l’adresse", cancel: "Annuler", invalidPrefix: "Utilisez 1 à 32 lettres, chiffres, points, tirets ou underscores.", reservedPrefix: "Ce nom de boîte est réservé. Choisissez un autre préfixe." },
	de: { button: "Eigene E-Mail", title: "Eigene E-Mail erstellen", description: "Wähle einprägsames Präfix und erstelle genau die gewünschte temporäre Adresse.", prefixLabel: "E-Mail-Präfix", prefixPlaceholder: "zum Beispiel: hallo", domainLabel: "E-Mail-Domain", create: "Adresse erstellen", cancel: "Abbrechen", invalidPrefix: "Nutze 1–32 Buchstaben, Zahlen, Punkte, Bindestriche oder Unterstriche.", reservedPrefix: "Dieser Postfachname ist reserviert. Wähle ein anderes Präfix." },
	ja: { button: "カスタムメール", title: "カスタムメールを作成", description: "覚えやすい接頭辞を選び、希望する一時メールアドレスを作成します。", prefixLabel: "メール接頭辞", prefixPlaceholder: "例：hello", domainLabel: "メールドメイン", create: "アドレスを作成", cancel: "キャンセル", invalidPrefix: "1～32文字の英小文字、数字、ピリオド、ハイフン、アンダースコアを使用してください。", reservedPrefix: "このメールボックス名は予約されています。別の接頭辞を選んでください。" },
	ko: { button: "맞춤 이메일", title: "맞춤 이메일 만들기", description: "기억하기 쉬운 접두사를 선택해 원하는 임시 이메일 주소를 만드세요.", prefixLabel: "이메일 접두사", prefixPlaceholder: "예: hello", domainLabel: "이메일 도메인", create: "주소 만들기", cancel: "취소", invalidPrefix: "영문 소문자, 숫자, 점, 하이픈, 밑줄을 1~32자로 입력하세요.", reservedPrefix: "이 메일함 이름은 예약되어 있습니다. 다른 접두사를 선택하세요." },
	ru: { button: "Свой адрес", title: "Создать свой адрес", description: "Выберите запоминающийся префикс и создайте нужный точный временный адрес.", prefixLabel: "Префикс", prefixPlaceholder: "например: hello", domainLabel: "Домен", create: "Создать адрес", cancel: "Отмена", invalidPrefix: "Используйте 1–32 строчные буквы, цифры, точки, дефисы или подчёркивания.", reservedPrefix: "Это имя ящика зарезервировано. Выберите другой префикс." },
	pt: { button: "Email personalizado", title: "Criar email personalizado", description: "Escolha um prefixo fácil de lembrar para criar o endereço temporário exato desejado.", prefixLabel: "Prefixo", prefixPlaceholder: "por exemplo: ola", domainLabel: "Domínio", create: "Criar endereço", cancel: "Cancelar", invalidPrefix: "Use de 1 a 32 letras minúsculas, números, pontos, hífens ou sublinhados.", reservedPrefix: "Este nome de caixa está reservado. Escolha outro prefixo." },
	ar: { button: "بريد مخصص", title: "إنشاء بريد مخصص", description: "اختر بادئة سهلة التذكر لإنشاء عنوان البريد المؤقت الذي تريده بالضبط.", prefixLabel: "بادئة البريد", prefixPlaceholder: "مثال: hello", domainLabel: "نطاق البريد", create: "إنشاء العنوان", cancel: "إلغاء", invalidPrefix: "استخدم من 1 إلى 32 حرفًا صغيرًا أو رقمًا أو نقطة أو شرطة أو شرطة سفلية.", reservedPrefix: "اسم صندوق البريد هذا محجوز. اختر بادئة أخرى." },
};

const SEO_NARRATIVE_COPY: Record<Locale, SeoNarrative> = {
	en: {
		title: "Why use cleanorapi.com temporary email",
		description:
			"cleanorapi.com is a free temporary email generator (temp mail) for low-risk sign-ups, OTP verification, and one-time downloads. Create a 24-hour disposable inbox in seconds.",
		points: [
			"Works well for temporary email registration and verification code workflows",
			"No sign-up or password setup for quick temp mail access",
			"Useful when users search smail temp mail or no-registration disposable inbox",
			"Use a permanent mailbox for banking, work, and identity-critical accounts",
		],
	},
	zh: {
		title: "为什么选择 cleanorapi.com 临时邮箱",
		description:
			"cleanorapi.com 是免费临时邮箱生成器，覆盖临时邮箱、一次性邮箱、24小时邮箱等常见场景。适合临时邮箱注册、验证码（OTP）接收和在线临时收信。",
		points: [
			"适合临时邮箱注册、活动领取、下载验证等低风险场景",
			"免注册、免密码，作为免费临时邮箱快速使用，减少真实邮箱暴露",
			"部分站点会限制临时邮箱域名，收不到信可尝试重发与刷新",
			"银行、工作和重要账号请务必使用长期邮箱",
		],
	},
	es: {
		title: "Por qué usar el correo temporal de cleanorapi.com",
		description:
			"cleanorapi.com ofrece correo temporal gratis (temp mail) para registros rápidos, verificación OTP y descargas puntuales con retención de 24 horas.",
		points: [
			"Útil para flujos de registro y verificación de bajo riesgo",
			"Sin cuenta ni contraseña para empezar de inmediato",
			"Si no llega el correo, prueba reenviar y actualizar la bandeja",
		],
	},
	fr: {
		title: "Pourquoi utiliser l'email temporaire cleanorapi.com",
		description:
			"cleanorapi.com fournit un email temporaire gratuit (temp mail) pour inscription rapide, OTP et usages ponctuels avec rétention de 24h.",
		points: [
			"Adapté aux inscriptions et vérifications à faible risque",
			"Aucun compte ni mot de passe requis pour commencer",
			"En cas de non-réception, renvoyez le code puis rafraîchissez la boîte",
		],
	},
	de: {
		title: "Warum temporäre E-Mail von cleanorapi.com",
		description:
			"cleanorapi.com bietet kostenlose Temp Mail für schnelle Registrierungen, OTP-Verifizierung und einmalige Nutzung mit 24h Aufbewahrung.",
		points: [
			"Ideal für risikoarme Registrierung und Verifizierung",
			"Kein Konto und kein Passwort für den Sofortstart",
			"Bei fehlender Zustellung: erneut senden und Posteingang aktualisieren",
		],
	},
	ja: {
		title: "cleanorapi.com の一時メールを使う理由",
		description:
			"cleanorapi.com は無料の一時メール（temp mail）です。登録・OTP認証・短期利用向けに24時間の受信箱をすぐ作成できます。",
		points: [
			"低リスクの登録と認証フローに最適",
			"アカウント登録やパスワード設定が不要",
			"届かない場合は再送と受信箱更新を試してください",
		],
	},
	ko: {
		title: "cleanorapi.com 임시 이메일을 쓰는 이유",
		description:
			"cleanorapi.com는 무료 임시 이메일(temp mail) 서비스로, 가입/OTP 인증/일회성 사용에 맞춘 24시간 메일함을 즉시 제공합니다.",
		points: [
			"저위험 가입 및 인증 흐름에 적합",
			"계정 생성과 비밀번호 없이 바로 사용",
			"메일이 안 오면 재전송 후 받은편지함을 새로고침",
		],
	},
	ru: {
		title: "Почему стоит использовать временную почту cleanorapi.com",
		description:
			"cleanorapi.com — бесплатный temp mail для быстрых регистраций, OTP-подтверждений и одноразовых задач с хранением до 24 часов.",
		points: [
			"Подходит для низкорисковых регистраций и подтверждений",
			"Без аккаунта и пароля — можно начать сразу",
			"Если письмо не пришло, попробуйте повторную отправку и обновление",
		],
	},
	pt: {
		title: "Por que usar o email temporário do cleanorapi.com",
		description:
			"cleanorapi.com oferece temp mail grátis para cadastro rápido, OTP e uso pontual, com caixa descartável por 24 horas.",
		points: [
			"Bom para cadastro e verificação de baixo risco",
			"Sem conta e sem senha para começar imediatamente",
			"Se o email atrasar, reenvie e atualize a caixa de entrada",
		],
	},
	ar: {
		title: "لماذا تستخدم البريد المؤقت من cleanorapi.com",
		description:
			"يوفر cleanorapi.com بريدًا مؤقتًا مجانيًا (temp mail) للتسجيل السريع ورموز OTP والاستخدام القصير مع احتفاظ لمدة 24 ساعة.",
		points: [
			"مناسب لعمليات التسجيل والتحقق منخفضة المخاطر",
			"بدون حساب أو كلمة مرور لبدء الاستخدام فورًا",
			"عند تأخر الرسالة جرّب إعادة الإرسال ثم تحديث الوارد",
		],
	},
};

function getSeoNarrative(locale: Locale): SeoNarrative {
	return SEO_NARRATIVE_COPY[locale] ?? SEO_NARRATIVE_COPY.en;
}

function getHomeJsonLd(locale: Locale) {
	const localizedHomeUrl = `${BASE_URL}${toLocalePath("/", locale)}`;
	const descriptionByLocale: Record<Locale, string> = {
		en: "cleanorapi.com provides free temporary email (temp mail) inboxes for sign-up and OTP verification with 24-hour auto cleanup.",
		zh: "cleanorapi.com 提供免费临时邮箱（一次性邮箱）服务，适合临时邮箱注册和验证码接收，邮件 24 小时后自动清理。",
		es: "cleanorapi.com ofrece correo temporal gratis (temp mail) para registros y códigos OTP con limpieza automática en 24 horas.",
		fr: "cleanorapi.com propose un email temporaire gratuit (temp mail) pour inscription et OTP avec suppression automatique après 24h.",
		de: "cleanorapi.com bietet kostenlose temporäre E-Mail (Temp Mail) für Registrierung und OTP mit automatischer 24h-Bereinigung.",
		ja: "cleanorapi.com は登録とOTP認証に使える無料の一時メール（temp mail）を提供し、24時間後に自動削除されます。",
		ko: "cleanorapi.com는 가입과 OTP 인증에 쓰는 무료 임시 이메일(temp mail)을 제공하며 24시간 후 자동 정리됩니다.",
		ru: "cleanorapi.com предоставляет бесплатную временную почту (temp mail) для регистрации и OTP с автоочисткой через 24 часа.",
		pt: "cleanorapi.com oferece email temporário grátis (temp mail) para cadastro e OTP com limpeza automática após 24h.",
		ar: "يوفر cleanorapi.com بريدًا مؤقتًا مجانيًا (temp mail) للتسجيل ورموز OTP مع حذف تلقائي بعد 24 ساعة.",
	};
	const description = descriptionByLocale[locale] ?? descriptionByLocale.en;

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				name: "cleanorapi.com",
				url: localizedHomeUrl,
				inLanguage: locale,
				description,
				potentialAction: {
					"@type": "UseAction",
					target: localizedHomeUrl,
				},
			},
			{
				"@type": "WebApplication",
				name: "cleanorapi.com Temporary Email",
				url: localizedHomeUrl,
				applicationCategory: "UtilitiesApplication",
				operatingSystem: "Web",
				inLanguage: locale,
				description,
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
			},
		],
	};
}

export function meta({ params, matches }: Route.MetaArgs) {
	const locale = getLocaleFromParams(params.lang);
	const copy = getDictionary(locale).home;

	return mergeRouteMeta(matches, [
		{
			title: copy.title,
		},
		{
			name: "description",
			content: copy.description,
		},
		{
			name: "keywords",
			content: copy.keywords,
		},
		{
			name: "robots",
			content: "index, follow",
		},
	]);
}

function isAddressExpired(
	addressIssuedAt: number | undefined,
	now = Date.now(),
): boolean {
	if (!addressIssuedAt) {
		return false;
	}
	return now - addressIssuedAt >= MAIL_RETENTION_MS;
}

function getRequestedMailDomain(
	value: FormDataEntryValue | null,
	allowedDomains: readonly string[],
): string | null {
	if (value === null || value === "") {
		return allowedDomains[0]!;
	}
	if (typeof value !== "string" || !allowedDomains.includes(value)) {
		return null;
	}
	return value;
}

function DomainSelect({
	domains,
	value,
	onChange,
	label,
	disabled,
	fullWidth = false,
}: {
	domains: string[];
	value: string;
	onChange: (domain: string) => void;
	label: string;
	disabled: boolean;
	fullWidth?: boolean;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;
		const handlePointerDown = (event: PointerEvent) => {
			if (!containerRef.current?.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsOpen(false);
		};
		document.addEventListener("pointerdown", handlePointerDown);
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("pointerdown", handlePointerDown);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	function selectAdjacentDomain(direction: 1 | -1) {
		const currentIndex = domains.indexOf(value);
		const nextIndex =
			(currentIndex + direction + domains.length) % domains.length;
		onChange(domains[nextIndex]!);
	}

	return (
		<div ref={containerRef} className={`domain-select ${fullWidth ? "w-full" : ""}`}>
			<button
				type="button"
				className="domain-select-trigger"
				aria-label={label}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				disabled={disabled}
				onClick={() => setIsOpen((open) => !open)}
				onKeyDown={(event) => {
					if (event.key === "ArrowDown" || event.key === "ArrowUp") {
						event.preventDefault();
						selectAdjacentDomain(event.key === "ArrowDown" ? 1 : -1);
						setIsOpen(true);
					}
				}}
			>
				<span className="min-w-0 truncate"><span className="text-theme-faint">@</span>{value}</span>
				<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="domain-select-caret" data-open={isOpen ? "true" : undefined} aria-hidden="true">
					<path d="m6 8 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</button>
			{isOpen && (
				<div className="domain-select-menu" role="listbox" aria-label={label}>
					{domains.map((domain) => (
						<button
							key={domain}
							type="button"
							role="option"
							aria-selected={value === domain}
							className="domain-select-option"
							data-active={value === domain ? "true" : undefined}
							onClick={() => {
								onChange(domain);
								setIsOpen(false);
							}}
						>
							<span className="truncate"><span className="text-theme-faint">@</span>{domain}</span>
							{value === domain && <span aria-hidden="true">✓</span>}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

function CustomAddressModal({
	domains,
	domain,
	onDomainChange,
	onClose,
	onCreate,
	copy,
	isSubmitting,
}: {
	domains: string[];
	domain: string;
	onDomainChange: (domain: string) => void;
	onClose: () => void;
	onCreate: (prefix: string) => void;
	copy: CustomAddressCopy;
	isSubmitting: boolean;
}) {
	const [prefix, setPrefix] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	function handleCreate() {
		if (isReservedMailboxPrefix(prefix)) {
			setError(
				copy.reservedPrefix ??
					"This mailbox name is reserved. Choose another prefix.",
			);
			return;
		}
		const normalizedPrefix = normalizeCustomMailboxPrefix(prefix);
		if (!normalizedPrefix) {
			setError(copy.invalidPrefix);
			return;
		}
		onCreate(normalizedPrefix);
	}

	return (
		<div
			className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="custom-address-title"
				className="glass-panel modal-sheet w-full max-w-lg p-5 sm:p-6"
				onClick={(event) => event.stopPropagation()}
			>
				<div className="space-y-1">
					<h2 id="custom-address-title" className="text-theme-primary font-display text-xl font-semibold">
						{copy.title}
					</h2>
					<p className="text-theme-muted text-sm leading-relaxed">{copy.description}</p>
				</div>

				<div className="mt-5 space-y-4">
					<label className="block space-y-2">
						<span className="text-theme-secondary text-xs font-semibold">{copy.prefixLabel}</span>
						<input
							autoFocus
							type="text"
							value={prefix}
							maxLength={32}
							autoCapitalize="none"
							autoComplete="off"
							spellCheck={false}
							className="address-composer-input"
							placeholder={copy.prefixPlaceholder}
							aria-invalid={Boolean(error)}
							aria-describedby={error ? "custom-address-error" : undefined}
							onChange={(event) => {
								setPrefix(event.target.value.toLowerCase());
								setError("");
							}}
							onKeyDown={(event) => {
								if (event.key === "Enter") handleCreate();
							}}
						/>
					</label>
					{error && (
						<p id="custom-address-error" className="text-xs text-rose-500" aria-live="polite">
							{error}
						</p>
					)}
					<div className="space-y-2">
						<p className="text-theme-secondary text-xs font-semibold">{copy.domainLabel}</p>
						<DomainSelect domains={domains} value={domain} onChange={onDomainChange} label={copy.domainLabel} disabled={isSubmitting} fullWidth />
					</div>
					<div className="border-theme-soft bg-theme-subtle rounded-xl border px-3 py-2.5 text-center text-sm font-semibold">
						<span className="text-theme-primary">{prefix || copy.prefixPlaceholder.replace(/^.*:\s*/, "")}</span>
						<span className="text-theme-faint">@{domain}</span>
					</div>
				</div>

				<div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
					<button type="button" className="neo-button-secondary" onClick={onClose} disabled={isSubmitting}>{copy.cancel}</button>
					<button type="button" className="neo-button" onClick={handleCreate} disabled={isSubmitting}>{isSubmitting ? "…" : copy.create}</button>
				</div>
			</div>
		</div>
	);
}

function EmailModal({
	email,
	onClose,
	copy,
	adsense,
}: {
	email: Email;
	onClose: () => void;
	copy: ReturnType<typeof getDictionary>["home"]["modal"];
	adsense: AdSenseConfig | null;
}) {
	const [detail, setDetail] = useState<EmailDetail | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetch(`/api/email/${email.id}`, {
			credentials: "include",
		})
			.then((res) => res.json() as Promise<EmailDetail>)
			.then((emailDetail) => {
				setDetail(emailDetail);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, [email.id]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	return (
		<div
			className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="email-preview-title"
				className="glass-panel modal-sheet flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="border-theme-soft flex items-start justify-between gap-3 border-b px-4 py-4 sm:px-5">
					<div className="space-y-1">
						<div className="text-theme-faint text-[11px] font-semibold uppercase tracking-[0.16em]">
							{copy.title}
						</div>
						<div
							id="email-preview-title"
							className="text-theme-primary font-display max-w-xl truncate pr-2 text-base font-semibold sm:text-[1.05rem]"
						>
							{email.subject}
						</div>
					</div>
					<button
						type="button"
						aria-label="Close email preview"
						onClick={onClose}
						className="border-theme-strong text-theme-secondary bg-theme-soft inline-flex h-8 w-8 items-center justify-center rounded-full border hover:brightness-95"
					>
						<svg
							viewBox="0 0 20 20"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.8"
							className="h-4 w-4"
							aria-hidden="true"
						>
							<path d="M5 5L15 15M15 5L5 15" strokeLinecap="round" />
						</svg>
					</button>
				</div>

				<div className="border-theme-soft text-theme-secondary grid gap-2.5 border-b px-4 py-3 text-[12px] leading-relaxed sm:grid-cols-2 sm:px-5">
					<div className="border-theme-soft bg-theme-subtle min-w-0 rounded-lg border px-3 py-2.5">
						<span className="text-theme-faint block text-[11px] font-semibold uppercase tracking-[0.1em]">
							{copy.from}
						</span>
						<p className="mt-1 break-all">
							{email.from_name} &lt;{email.from_address}&gt;
						</p>
					</div>
					<div className="border-theme-soft bg-theme-subtle rounded-lg border px-3 py-2.5">
						<span className="text-theme-faint block text-[11px] font-semibold uppercase tracking-[0.1em]">
							{copy.time}
						</span>
						<p className="mt-1">{new Date(email.time).toLocaleString()}</p>
					</div>
				</div>

				<div className="overflow-y-auto p-4 sm:p-5">
					{loading ? (
						<div className="text-theme-muted flex h-[min(62vh,700px)] items-center justify-center rounded-xl border border-dashed border-theme-soft text-[13px]">
							{copy.loading}
						</div>
					) : detail?.body ? (
						<iframe
							srcDoc={detail.body}
							title="Email content"
							className="border-theme-soft h-[min(62vh,700px)] w-full overflow-hidden rounded-xl border bg-white"
							sandbox=""
							referrerPolicy="no-referrer"
						/>
					) : (
						<div className="text-theme-muted flex h-[min(62vh,700px)] items-center justify-center rounded-xl border border-dashed border-theme-soft text-[13px]">
							{copy.empty}
						</div>
					)}
					<AdSlot
						client={adsense?.client}
						slot={adsense?.emailDetailSlot}
					/>
				</div>
			</div>
		</div>
	);
}

function formatTime(
	timestamp: number,
	locale: Locale,
	referenceNow: number,
): string {
	const intlLocale = toIntlLocale(locale);
	const relative = new Intl.RelativeTimeFormat(intlLocale, { numeric: "auto" });
	const diffSeconds = Math.round((timestamp - referenceNow) / 1000);

	if (Math.abs(diffSeconds) < 60) {
		return relative.format(diffSeconds, "second");
	}

	const diffMinutes = Math.round(diffSeconds / 60);
	if (Math.abs(diffMinutes) < 60) {
		return relative.format(diffMinutes, "minute");
	}

	const diffHours = Math.round(diffMinutes / 60);
	if (Math.abs(diffHours) < 24) {
		return relative.format(diffHours, "hour");
	}

	const diffDays = Math.round(diffHours / 24);
	if (Math.abs(diffDays) < 7) {
		return relative.format(diffDays, "day");
	}

	return new Date(timestamp).toLocaleDateString(intlLocale, {
		timeZone: "UTC",
	});
}

async function getEmails(d1: D1Database, toAddress: string) {
	const { results } = await d1
		.prepare(
			"SELECT id, to_address, from_name, from_address, subject, time FROM emails WHERE to_address = ? ORDER BY time DESC LIMIT 100",
		)
		.bind(toAddress)
		.all();
	return results as Email[];
}

export async function loader({ request, context, params }: Route.LoaderArgs) {
	const { locale, shouldRedirectToDefault, isInvalid } = resolveLocaleParam(
		params.lang,
	);
	if (isInvalid) {
		throw new Response("Not Found", { status: 404 });
	}
	if (shouldRedirectToDefault) {
		const url = new URL(request.url);
		const normalizedPath = stripDefaultLocalePrefix(url.pathname);
		throw redirect(`${normalizedPath}${url.search}`, 301);
	}

	const cookieHeader = request.headers.get("Cookie");
	const session = await getSession(cookieHeader);
	let addresses = (session.get("addresses") || []) as string[];
	const addressIssuedAt = session.get("addressIssuedAt");
	const now = Date.now();
	const mailDomains = getMailDomains(context.cloudflare.env.MAIL_DOMAINS);
	let shouldCommitSession = false;
	const validAddresses = addresses.filter((address) =>
		isAllowedRecipientAddress(address, mailDomains),
	);
	if (validAddresses.length !== addresses.length) {
		addresses = validAddresses;
		session.set("addresses", addresses);
		if (addresses.length === 0) {
			session.unset("addressIssuedAt");
		}
		shouldCommitSession = true;
	}

	if (addresses.length > 0 && isAddressExpired(addressIssuedAt, now)) {
		const currentDomain = getMailDomainFromAddress(addresses[0]!);
		const nextDomain =
			currentDomain && mailDomains.includes(currentDomain)
				? currentDomain
				: mailDomains[0]!;
		addresses = [generateEmailAddress(nextDomain)];
		session.set("addresses", addresses);
		session.set("addressIssuedAt", now);
		shouldCommitSession = true;
	} else if (addresses.length > 0 && !addressIssuedAt) {
		session.set("addressIssuedAt", now);
		shouldCommitSession = true;
	}

	const emails =
		addresses.length > 0
			? await getEmails(context.cloudflare.env.D1, addresses[0]!)
			: [];
	const adsense = getAdSenseConfig(context.cloudflare.env);

	if (shouldCommitSession) {
		const headers = new Headers();
		headers.set("Set-Cookie", await commitSession(session));
		return data(
			{
				addresses,
				emails,
				mailDomains,
				adsense,
				locale,
				renderedAt: now,
			},
			{ headers },
		);
	}

	return {
		addresses,
		emails,
		mailDomains,
		adsense,
		locale,
		renderedAt: now,
	};
}

export async function action({ request, context }: Route.ActionArgs) {
	const formData = await request.formData();
	const intent = formData.get("intent");
	const cookieHeader = request.headers.get("Cookie");
	const session = await getSession(cookieHeader);
	let addresses: string[] = (session.get("addresses") || []) as string[];
	switch (intent) {
		case "generate": {
			const mailDomains = getMailDomains(context.cloudflare.env.MAIL_DOMAINS);
			const requestedDomain = getRequestedMailDomain(
				formData.get("domain"),
				mailDomains,
			);
			if (!requestedDomain) {
				return data({ addresses }, { status: 400 });
			}
			addresses = [generateEmailAddress(requestedDomain)];
			session.set("addressIssuedAt", Date.now());
			break;
		}
		case "custom": {
			const mailDomains = getMailDomains(context.cloudflare.env.MAIL_DOMAINS);
			const requestedDomain = getRequestedMailDomain(
				formData.get("domain"),
				mailDomains,
			);
			const prefixValue = formData.get("prefix");
			const prefix =
				typeof prefixValue === "string"
					? normalizeCustomMailboxPrefix(prefixValue)
					: null;
			if (!requestedDomain || !prefix) {
				return data({ addresses }, { status: 400 });
			}
			addresses = [generateCustomEmailAddress(prefix, requestedDomain)];
			session.set("addressIssuedAt", Date.now());
			break;
		}
		case "delete": {
			addresses = [];
			session.unset("addressIssuedAt");
			break;
		}
	}
	session.set("addresses", addresses);
	const cookie = await commitSession(session);
	const headers = new Headers();
	headers.set("Set-Cookie", cookie);
	return data(
		{
			addresses: session.get("addresses") || [],
		},
		{
			headers,
		},
	);
}

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
	const fetcher = useFetcher<typeof actionData>();
	const revalidator = useRevalidator();
	const [copied, setCopied] = useState(false);
	const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
	const [isCustomAddressOpen, setIsCustomAddressOpen] = useState(false);
	const [selectedDomain, setSelectedDomain] = useState(() => {
		const currentDomain = getMailDomainFromAddress(loaderData.addresses[0] ?? "");
		return currentDomain && loaderData.mailDomains.includes(currentDomain)
			? currentDomain
			: loaderData.mailDomains[0]!;
	});
	const [lastInboxRefreshAt, setLastInboxRefreshAt] = useState(() =>
		loaderData.renderedAt,
	);
	const locale = loaderData.locale || DEFAULT_LOCALE;
	const copy = getDictionary(locale).home;
	const customAddressCopy = CUSTOM_ADDRESS_COPY[locale];
	const seoGuides = getSeoGuides(locale);
	const seoNarrative = getSeoNarrative(locale);
	const homeJsonLd = getHomeJsonLd(locale);
	const addresses = fetcher.data?.addresses || loaderData.addresses;
	const emails = loaderData.emails;
	const isSubmitting = fetcher.state === "submitting";
	const submittingIntent = fetcher.formData?.get("intent");
	const isRefreshingInbox = revalidator.state !== "idle";

	useEffect(() => {
		setLastInboxRefreshAt(loaderData.renderedAt);
	}, [loaderData.renderedAt]);

	useEffect(() => {
		const currentDomain = getMailDomainFromAddress(addresses[0] ?? "");
		if (currentDomain && loaderData.mailDomains.includes(currentDomain)) {
			setSelectedDomain(currentDomain);
		}
	}, [addresses, loaderData.mailDomains]);

	useEffect(() => {
		if (fetcher.state === "idle" && fetcher.data?.addresses?.[0]) {
			setIsCustomAddressOpen(false);
		}
	}, [fetcher.data, fetcher.state]);

	return (
		<div className="flex flex-1 py-3 sm:py-4">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
			/>
			<div className="grid w-full gap-4">
				<section className="glass-panel relative overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
					<div
						className="absolute -left-20 -top-24 h-44 w-44 rounded-full opacity-80 blur-[88px]"
						style={{ background: "var(--accent-a)" }}
					/>
					<div
						className="absolute -right-14 top-20 h-36 w-36 rounded-full opacity-75 blur-[82px]"
						style={{ background: "var(--accent-b)" }}
					/>
					<div className="relative space-y-3">
						<header className="space-y-2.5">
							<p className="soft-tag">{copy.heroTag}</p>
							<h1 className="text-theme-primary font-display max-w-2xl text-xl leading-tight font-bold sm:text-3xl">
								{copy.heroTitle}
							</h1>
							<p className="text-theme-secondary max-w-xl text-sm leading-relaxed">
								{copy.heroDescription}
							</p>
						</header>

						<div className="theme-badge flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-1.5 text-[10px] sm:text-[11px]">
							<span className="text-theme-faint">
								<span className="text-theme-primary font-display font-semibold">
									{copy.stats.lifetimeValue}
								</span>{" "}
								{copy.stats.lifetime}
							</span>
							<span className="text-theme-faint">
								<span className="text-theme-primary font-display font-semibold">
									{copy.stats.refreshValue}
								</span>{" "}
								{copy.stats.refresh}
							</span>
							<span className="text-theme-faint">
								<span className="text-theme-primary font-display font-semibold">
									{copy.stats.registrationValue}
								</span>{" "}
								{copy.stats.registration}
							</span>
						</div>
					</div>
				</section>

				<section className="glass-panel px-4 py-4 sm:px-5 sm:py-4">
					<div className="grid gap-4">
						<div>
							<div className="mb-3 space-y-1">
								<p className="text-theme-faint text-[11px] font-semibold uppercase tracking-[0.16em]">
									{copy.currentAddress}
								</p>
								<p className="text-theme-muted hidden text-xs sm:block">
									{copy.noAddressDescription}
								</p>
							</div>
							<div className="space-y-4">
								{addresses.length > 0 ? (
									<>
										<div className="theme-card p-3">
												<div className="border-theme-soft bg-theme-subtle flex flex-col gap-2 rounded-xl border px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
													<div className="text-theme-primary min-w-0 text-sm font-semibold break-all sm:truncate">
														{addresses[0]}
													</div>
													<button
														type="button"
														className="neo-button-secondary w-full sm:w-auto sm:min-w-20"
														onClick={async () => {
															if (
																typeof navigator !== "undefined" &&
															navigator.clipboard
														) {
															try {
																await navigator.clipboard.writeText(
																	addresses[0] ?? "",
																);
																setCopied(true);
																setTimeout(() => setCopied(false), 1500);
															} catch {
																// ignore clipboard errors
															}
														}
													}}
												>
													{copied ? copy.copied : copy.copy}
												</button>
											</div>
										</div>

									<div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
										<DomainSelect
											domains={loaderData.mailDomains}
											value={selectedDomain}
											onChange={setSelectedDomain}
											label={customAddressCopy.domainLabel}
											disabled={isSubmitting}
										/>
										<button
												type="button"
												name="intent"
												value="generate"
												className="neo-button w-full justify-center sm:min-w-[10.5rem] sm:w-auto"
												onClick={() => {
													fetcher.submit(
														{ intent: "generate", domain: selectedDomain },
														{ method: "post" },
													);
												}}
												disabled={isSubmitting}
											>
											{submittingIntent === "generate" && isSubmitting
												? copy.generating
												: copy.generateNew}
										</button>
										<button
											type="button"
											className="neo-button-secondary w-full justify-center sm:w-auto"
											onClick={() => setIsCustomAddressOpen(true)}
											disabled={isSubmitting}
										>
											{customAddressCopy.button}
										</button>
										<button
												type="button"
												name="intent"
												value="delete"
												className="neo-button-secondary w-full justify-center sm:w-auto"
												onClick={() => {
													fetcher.submit(
														{ intent: "delete" },
														{ method: "post" },
													);
												}}
												disabled={isSubmitting}
											>
												{submittingIntent === "delete" && isSubmitting
													? copy.deleting
													: copy.deleteAddress}
											</button>
										</div>

										<p className="border-theme-soft bg-theme-subtle text-theme-faint rounded-lg border px-3 py-2 text-[11px] leading-relaxed">
											{copy.safetyHint}
										</p>
									</>
								) : (
									<div className="theme-card p-3">
										<div className="text-theme-primary text-sm font-semibold">
											{copy.noAddressTitle}
										</div>
										<p className="text-theme-muted mt-1 text-xs leading-relaxed">
											{copy.noAddressDescription}
										</p>
										<div className="mt-3">
											<DomainSelect
												domains={loaderData.mailDomains}
												value={selectedDomain}
												onChange={setSelectedDomain}
												label={customAddressCopy.domainLabel}
												disabled={isSubmitting}
											/>
										</div>
										<div className="mt-3 flex flex-col gap-2 sm:flex-row">
											<button
												type="button"
												name="intent"
												value="generate"
												className="neo-button w-full justify-center sm:w-auto sm:min-w-[10.5rem]"
												onClick={() => {
													fetcher.submit(
														{ intent: "generate", domain: selectedDomain },
														{ method: "post" },
													);
												}}
												disabled={isSubmitting}
											>
												{submittingIntent === "generate" && isSubmitting
													? copy.generating
													: copy.generateAddress}
											</button>
											<button
												type="button"
												className="neo-button-secondary w-full justify-center sm:w-auto"
												onClick={() => setIsCustomAddressOpen(true)}
												disabled={isSubmitting}
											>
												{customAddressCopy.button}
											</button>
										</div>
										<p className="border-theme-soft bg-theme-subtle text-theme-faint mt-3 rounded-lg border px-3 py-2 text-[11px] leading-relaxed">
											{copy.safetyHint}
										</p>
									</div>
								)}
							</div>
						</div>

						<div className="border-theme-soft border-t border-dashed pt-3">
							<div className="mb-3 flex items-start justify-between gap-3">
								<div>
									<p className="text-theme-faint text-[11px] font-semibold uppercase tracking-[0.16em]">
										{copy.inboxTag}
									</p>
									<p className="text-theme-primary font-display text-xl font-semibold">
										{copy.inboxTitle}
									</p>
									<p className="text-theme-faint mt-1 text-[11px]">
										{copy.lastRefresh}:{" "}
										{formatRefreshTime(lastInboxRefreshAt, locale)}
									</p>
								</div>
								<div className="flex flex-col items-end gap-2">
									<span className="theme-badge hidden px-3 py-1 text-[11px] font-medium sm:inline-flex">
										{copy.tapToOpen}
									</span>
									<button
										type="button"
										className="theme-badge px-3 py-1 text-[11px] font-semibold disabled:cursor-not-allowed disabled:opacity-60"
										onClick={() => {
											revalidator.revalidate();
										}}
										disabled={isRefreshingInbox}
									>
										{isRefreshingInbox
											? copy.refreshingInbox
											: copy.refreshInbox}
									</button>
								</div>
							</div>

							<div className="flex min-h-[360px] flex-col gap-2.5 overflow-y-auto py-1 pr-0.5">
								{emails.length === 0 ? (
									<div className="border-theme-strong bg-theme-subtle mt-6 rounded-2xl border border-dashed px-4 py-10 text-center">
										<p className="text-theme-primary font-display text-lg font-semibold">
											{copy.emptyInboxTitle}
										</p>
										<p className="text-theme-muted mt-1 text-sm">
											{copy.emptyInboxDescription}
										</p>
									</div>
								) : (
									emails.map((email) => (
										<button
											key={email.id}
											type="button"
											className="email-item"
											onClick={() => setSelectedEmail(email)}
										>
											<div className="min-w-0">
												<div className="flex items-start justify-between gap-3">
													<div className="text-theme-primary font-display truncate text-sm font-semibold">
														{email.subject}
													</div>
													<div className="text-theme-faint whitespace-nowrap text-[11px]">
														{formatTime(
															email.time,
															locale,
															loaderData.renderedAt,
														)}
													</div>
												</div>
												<div className="text-theme-muted mt-1 truncate text-xs">
													{email.from_name}
													<span className="text-theme-faint">
														{" "}
														&lt;{email.from_address}&gt;
													</span>
												</div>
											</div>
										</button>
									))
								)}
							</div>
							<AdSlot
								client={loaderData.adsense?.client}
								slot={loaderData.adsense?.inboxSlot}
							/>
						</div>
					</div>
				</section>

				<AdSlot
					client={loaderData.adsense?.client}
					slot={loaderData.adsense?.homeSlot}
				/>

				<section className="glass-panel px-4 py-4 sm:px-5 sm:py-5">
					<h2 className="text-theme-primary font-display mb-3 text-lg font-semibold sm:text-xl">
						{seoNarrative.title}
					</h2>
					<div className="grid gap-3 lg:grid-cols-[0.92fr,1.08fr]">
						<div className="theme-card space-y-3 p-4">
							<p className="text-theme-faint text-[11px] font-semibold uppercase tracking-[0.16em]">
								{seoGuides.title}
							</p>
							<div className="grid gap-2 sm:grid-cols-2">
								{seoGuides.items.map((item) => (
									<Link
										key={item.path}
										to={toLocalePath(item.path, locale)}
										prefetch="viewport"
										className="theme-badge flex items-center justify-between px-3 py-1.5 text-[11px] font-medium"
									>
										<span>{item.label}</span>
										<span aria-hidden="true">{"->"}</span>
									</Link>
								))}
							</div>
						</div>

						<div className="theme-card space-y-3 p-4">
							<p className="text-theme-secondary text-xs leading-relaxed sm:text-sm">
								{seoNarrative.description}
							</p>
							<ul className="text-theme-muted list-disc space-y-1 pl-5 text-[11px] leading-relaxed sm:text-xs">
								{seoNarrative.points.map((point) => (
									<li key={point}>{point}</li>
								))}
							</ul>
						</div>
					</div>
				</section>
			</div>

			{selectedEmail && (
				<EmailModal
					email={selectedEmail}
					onClose={() => setSelectedEmail(null)}
					copy={copy.modal}
					adsense={loaderData.adsense}
				/>
			)}
			{isCustomAddressOpen && (
				<CustomAddressModal
					domains={loaderData.mailDomains}
					domain={selectedDomain}
					onDomainChange={setSelectedDomain}
					onClose={() => setIsCustomAddressOpen(false)}
					onCreate={(prefix) => {
						fetcher.submit(
							{ intent: "custom", domain: selectedDomain, prefix },
							{ method: "post" },
						);
					}}
					copy={customAddressCopy}
					isSubmitting={isSubmitting}
				/>
			)}
		</div>
	);
}
