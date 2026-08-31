import type { Locale } from "~/i18n/config";

export const BLOG_LOCALES = [
	"en",
	"zh",
	"es",
	"fr",
	"de",
	"ja",
	"ko",
	"ru",
	"pt",
	"ar",
] as const;
export const BLOG_PAGE_SIZE = 6;

export type BlogLocale = (typeof BLOG_LOCALES)[number];

export type BlogPostMeta = {
	slug: string;
	title: string;
	description: string;
	publishedAt: string;
	updatedAt?: string;
	readingMinutes: number;
};

const BLOG_POSTS: Record<BlogLocale, BlogPostMeta[]> = {
	en: [
		{
			slug: "reopen-temporary-inbox-safely",
			title: "How to Reopen a Temporary Inbox Safely Without Losing Access",
			description:
				"Learn how direct inbox links, browser sessions, and 24-hour message retention work so you can reopen a temporary mailbox without exposing access or relying on deleted mail.",
			publishedAt: "2026-09-03",
			readingMinutes: 10,
		},
		{
			slug: "verification-link-expired",
			title: "Verification Link Expired? A Safe Step-by-Step Recovery Guide",
			description:
				"Learn why email verification links expire and follow a safe resend, browser-session, phishing-check, and account-recovery workflow without creating more problems.",
			publishedAt: "2026-09-02",
			readingMinutes: 10,
		},
		{
			slug: "temporary-email-for-forum-signups",
			title: "Should You Use Temporary Email for Forum and Community Sign-Ups?",
			description:
				"A practical decision guide for using temporary email in low-risk forums without losing account recovery, reputation, private messages, or community access.",
			publishedAt: "2026-09-01",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-newsletters",
			title: "How to Use Temporary Email for Newsletters and Event Sign-Ups Responsibly",
			description:
				"A practical guide to separating optional newsletters and low-risk event mail from your primary inbox without losing important tickets, reminders, or privacy control.",
			publishedAt: "2026-08-31",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-downloads",
			title: "How to Use Temporary Email for Downloads Without Losing Access or Privacy",
			description:
				"A practical safety workflow for using temporary email to download low-risk resources while protecting your inbox, files, access, and license records.",
			publishedAt: "2026-08-28",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-online-shopping",
			title: "How to Use Temporary Email for Online Shopping Without Losing Receipts or Returns",
			description:
				"A practical guide to separating shopping mail from your primary inbox while preserving order confirmations, return access, warranties, and account recovery.",
			publishedAt: "2026-08-27",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-free-trials",
			title: "How to Use Temporary Email for Free Trials Without Losing Important Access",
			description:
				"A practical workflow for using temporary email during low-risk free trials while preserving access, records, and cancellation control when a trial becomes valuable.",
			publishedAt: "2026-08-26",
			readingMinutes: 9,
		},
		{
			slug: "are-temporary-emails-safe",
			title: "Are Temporary Emails Safe? Privacy Limits Explained",
			description:
				"A practical risk framework for temporary email: what it protects, what it cannot protect, and how to decide when a permanent inbox is necessary.",
			publishedAt: "2026-08-25",
			readingMinutes: 9,
		},
		{
			slug: "direct-email-inbox-link",
			title: "Open a Temporary Inbox Directly with an Email Address Link",
			description:
				"Learn how cleanorapi.com direct inbox links work, when to use them, and the privacy limits of passwordless temporary mailboxes.",
			publishedAt: "2026-08-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-best-practices",
			title: "Temporary Email Best Practices for Safer Sign-Ups",
			description:
				"Learn practical temporary email best practices to reduce spam, avoid lockouts, and protect your primary inbox.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Temporary Email vs Email Alias: Which One Should You Use?",
			description:
				"Compare temporary inboxes and email aliases by privacy, recovery, and long-term account safety.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "OTP Email Not Arriving? 8 Fast Fixes That Usually Work",
			description:
				"Troubleshoot delayed verification emails with a practical checklist for resend issues, sender blocks, and inbox refresh flow.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	zh: [
		{
			slug: "reopen-temporary-inbox-safely",
			title: "如何安全地重新打开临时收件箱，同时避免丢失访问权",
			description:
				"了解直达收件箱链接、浏览器会话和 24 小时邮件保留机制，安全地重新打开临时邮箱，同时避免泄露访问权或误以为已删除邮件可以恢复。",
			publishedAt: "2026-09-03",
			readingMinutes: 10,
		},
		{
			slug: "verification-link-expired",
			title: "验证链接失效或过期怎么办？一套安全、可执行的恢复流程",
			description:
				"了解邮箱验证链接为何过期，并通过一次重发、会话检查、防钓鱼核验和账号迁移步骤安全恢复访问，避免反复操作扩大问题。",
			publishedAt: "2026-09-02",
			readingMinutes: 10,
		},
		{
			slug: "temporary-email-for-forum-signups",
			title: "论坛和社区注册适合使用临时邮箱吗？",
			description:
				"一份面向低风险论坛注册的实用判断指南：在减少主邮箱暴露的同时，避免失去账号恢复、社区声誉、私信与长期访问能力。",
			publishedAt: "2026-09-01",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-newsletters",
			title: "如何用临时邮箱订阅资讯和报名活动，同时不丢失重要通知",
			description:
				"一套管理可选资讯订阅和低风险活动报名的实用方法：减少主邮箱干扰，同时保留票据、提醒和隐私控制。",
			publishedAt: "2026-08-29",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-downloads",
			title: "下载资料时如何使用临时邮箱，同时兼顾隐私、文件安全与后续访问",
			description:
				"一套使用临时邮箱下载低风险资源的安全流程：保护主邮箱，核验文件来源，并保留必要的访问、授权与凭证。",
			publishedAt: "2026-08-28",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-online-shopping",
			title: "网购时如何使用临时邮箱，同时保留收据与退换货凭证",
			description:
				"一套兼顾邮箱隐私与订单连续性的实用方法：减少营销邮件，同时妥善保存订单确认、退换货入口、保修资料和账号恢复能力。",
			publishedAt: "2026-08-27",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-free-trials",
			title: "免费试用注册如何避免营销邮件和续费提醒",
			description:
				"一套管理低风险免费试用的实用流程：减少营销邮件，同时在试用变得有价值时保住访问、凭证和取消主动权。",
			publishedAt: "2026-08-26",
			readingMinutes: 9,
		},
		{
			slug: "are-temporary-emails-safe",
			title: "临时邮箱安全吗？隐私边界与正确使用方法",
			description:
				"用风险分级和可执行流程说明临时邮箱能保护什么、不能保护什么，以及何时必须改用长期邮箱。",
			publishedAt: "2026-08-25",
			readingMinutes: 9,
		},
		{
			slug: "direct-email-inbox-link",
			title: "用邮箱地址链接直接打开临时收件箱",
			description:
				"了解如何通过 cleanorapi.com 邮箱地址直达收件箱、适用场景、24 小时会话以及无密码访问的隐私边界。",
			publishedAt: "2026-08-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-best-practices",
			title: "临时邮箱最佳实践：更安全地完成注册",
			description:
				"用一套可执行的方法减少垃圾邮件、避免账号锁死，并保护你的主邮箱。",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "临时邮箱 vs 邮箱别名：到底该用哪种？",
			description:
				"从隐私、可恢复性、长期账号安全三个角度，比较临时邮箱与邮箱别名。",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "收不到验证码邮件？8 个高效排查方法",
			description:
				"快速定位验证码邮件延迟或丢失问题：重发、拦截、刷新策略与备用方案。",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	es: [
		{
			slug: "reopen-temporary-inbox-safely",
			title: "Cómo volver a abrir un buzón temporal de forma segura sin perder el acceso",
			description:
				"Descubre cómo funcionan los enlaces directos, las sesiones del navegador y la retención de 24 horas para reabrir un buzón temporal sin exponer el acceso ni confiar en mensajes eliminados.",
			publishedAt: "2026-09-03",
			readingMinutes: 10,
		},
		{
			slug: "verification-link-expired",
			title: "¿Enlace de verificación caducado? Guía segura para recuperar el acceso",
			description:
				"Descubre por qué caducan los enlaces de verificación y aplica un proceso seguro de reenvío, sesión, prevención de phishing y recuperación de cuenta.",
			publishedAt: "2026-09-02",
			readingMinutes: 10,
		},
		{
			slug: "temporary-email-for-forum-signups",
			title: "¿Conviene usar correo temporal para registrarse en foros y comunidades?",
			description:
				"Una guía práctica para usar correo temporal en foros de bajo riesgo sin perder recuperación, reputación, mensajes privados ni acceso a la comunidad.",
			publishedAt: "2026-09-01",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-newsletters",
			title: "Cómo usar correo temporal para boletines y registros de eventos con responsabilidad",
			description:
				"Una guía práctica para separar boletines opcionales y correos de eventos de bajo riesgo sin perder avisos, entradas ni control de privacidad.",
			publishedAt: "2026-08-29",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-downloads",
			title: "Cómo usar correo temporal para descargas sin perder acceso ni privacidad",
			description:
				"Un proceso práctico para descargar recursos de bajo riesgo con correo temporal y proteger tu bandeja, archivos, acceso y licencias.",
			publishedAt: "2026-08-28",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-online-shopping",
			title: "Cómo usar correo temporal al comprar en línea sin perder recibos ni devoluciones",
			description:
				"Una guía práctica para separar el correo comercial de tu bandeja principal sin perder confirmaciones, devoluciones, garantías ni recuperación de cuenta.",
			publishedAt: "2026-08-27",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-free-trials",
			title: "Cómo usar correo temporal en pruebas gratuitas sin perder el acceso",
			description:
				"Un proceso práctico para probar servicios de bajo riesgo con correo temporal y conservar acceso, registros y control de cancelación cuando importen.",
			publishedAt: "2026-08-26",
			readingMinutes: 9,
		},
		{
			slug: "are-temporary-emails-safe",
			title: "¿Son seguros los correos temporales? Límites de privacidad explicados",
			description:
				"Un marco práctico para entender qué protege un correo temporal, qué riesgos mantiene y cuándo usar una dirección permanente.",
			publishedAt: "2026-08-25",
			readingMinutes: 9,
		},
		{
			slug: "direct-email-inbox-link",
			title: "Abre un buzón temporal directamente con un enlace de email",
			description:
				"Descubre cómo funcionan los enlaces directos de cleanorapi.com, cuándo usarlos y los límites de privacidad de un buzón sin contraseña.",
			publishedAt: "2026-08-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-best-practices",
			title: "Buenas prácticas de correo temporal para registros más seguros",
			description:
				"Aprende prácticas de correo temporal para reducir spam, evitar bloqueos y proteger tu bandeja principal.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Correo temporal vs alias de correo: ¿cuál te conviene?",
			description:
				"Compara correo temporal y alias por privacidad, recuperación y seguridad de cuentas a largo plazo.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "¿No llega el correo OTP? 8 soluciones rápidas que funcionan",
			description:
				"Resuelve correos de verificación retrasados con una lista práctica de reenvío, bloqueos del remitente y refresco del buzón.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	fr: [
		{
			slug: "reopen-temporary-inbox-safely",
			title: "Comment rouvrir une boîte temporaire en sécurité sans perdre l’accès",
			description:
				"Comprenez les liens directs, les sessions du navigateur et la conservation de 24 heures afin de rouvrir une boîte temporaire sans exposer l’accès ni compter sur des messages supprimés.",
			publishedAt: "2026-09-03",
			readingMinutes: 10,
		},
		{
			slug: "verification-link-expired",
			title: "Lien de vérification expiré : méthode sûre pour récupérer l'accès",
			description:
				"Comprenez pourquoi un lien de vérification expire et suivez une méthode sûre de renvoi, de contrôle de session, d'antiphishing et de récupération.",
			publishedAt: "2026-09-02",
			readingMinutes: 10,
		},
		{
			slug: "temporary-email-for-forum-signups",
			title: "Faut-il utiliser un e-mail temporaire pour s'inscrire sur un forum ou dans une communauté ?",
			description:
				"Un guide pratique pour les forums à faible risque, sans perdre la récupération du compte, la réputation, les messages privés ni l'accès futur.",
			publishedAt: "2026-09-01",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-newsletters",
			title: "Utiliser un e-mail temporaire pour les newsletters et inscriptions à des événements",
			description:
				"Un guide pratique pour séparer newsletters facultatives et messages d'événements à faible risque sans perdre rappels, billets ou contrôle de la confidentialité.",
			publishedAt: "2026-08-29",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-downloads",
			title: "Utiliser un e-mail temporaire pour télécharger sans perdre accès ni confidentialité",
			description:
				"Une méthode pratique pour télécharger des ressources à faible risque avec un e-mail temporaire tout en protégeant boîte, fichiers, accès et licences.",
			publishedAt: "2026-08-28",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-online-shopping",
			title: "Utiliser un e-mail temporaire pour les achats en ligne sans perdre reçus ni retours",
			description:
				"Une méthode pratique pour isoler les messages commerciaux tout en conservant confirmations, retours, garanties et récupération de compte.",
			publishedAt: "2026-08-27",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-free-trials",
			title: "Utiliser un e-mail temporaire pour un essai gratuit sans perdre l'accès",
			description:
				"Une méthode pratique pour les essais à faible risque, tout en préservant l'accès, les justificatifs et le contrôle de l'annulation.",
			publishedAt: "2026-08-26",
			readingMinutes: 9,
		},
		{
			slug: "are-temporary-emails-safe",
			title: "Les e-mails temporaires sont-ils sûrs ? Leurs limites de confidentialité",
			description:
				"Un cadre pratique pour savoir ce qu'une adresse temporaire protège, ses risques et quand préférer une boîte permanente.",
			publishedAt: "2026-08-25",
			readingMinutes: 9,
		},
		{
			slug: "direct-email-inbox-link",
			title: "Ouvrir directement une boîte temporaire avec un lien email",
			description:
				"Découvrez les liens directs cleanorapi.com, leurs usages et les limites de confidentialité d'une boîte temporaire sans mot de passe.",
			publishedAt: "2026-08-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-best-practices",
			title:
				"Bonnes pratiques d'email temporaire pour des inscriptions plus sûres",
			description:
				"Découvrez des pratiques concrètes pour réduire le spam, éviter les blocages et protéger votre boîte principale.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Email temporaire vs alias email : lequel choisir ?",
			description:
				"Comparez email temporaire et alias selon la confidentialité, la récupération et la sécurité à long terme.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "Email OTP non reçu ? 8 solutions rapides qui marchent",
			description:
				"Résolvez les retards d'emails de vérification avec une checklist pratique : renvoi, filtrage et rafraîchissement.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	de: [
		{
			slug: "reopen-temporary-inbox-safely",
			title: "Ein temporäres Postfach sicher erneut öffnen, ohne den Zugriff zu verlieren",
			description:
				"Erfahren Sie, wie Direktlinks, Browser-Sitzungen und die 24-Stunden-Aufbewahrung funktionieren, um ein temporäres Postfach ohne Zugriffsleck oder falsche Wiederherstellungserwartung erneut zu öffnen.",
			publishedAt: "2026-09-03",
			readingMinutes: 10,
		},
		{
			slug: "verification-link-expired",
			title: "Verifizierungslink abgelaufen? Eine sichere Anleitung zur Wiederherstellung",
			description:
				"Erfahren Sie, warum Bestätigungslinks ablaufen, und nutzen Sie einen sicheren Ablauf für Neuversand, Browsersitzung, Phishing-Prüfung und Kontowiederherstellung.",
			publishedAt: "2026-09-02",
			readingMinutes: 10,
		},
		{
			slug: "temporary-email-for-forum-signups",
			title: "Sollte man für Forum- und Community-Anmeldungen eine temporäre E-Mail verwenden?",
			description:
				"Ein praktischer Entscheidungsleitfaden für risikoarme Foren, ohne Kontowiederherstellung, Ansehen, private Nachrichten oder späteren Zugang zu verlieren.",
			publishedAt: "2026-09-01",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-newsletters",
			title: "Temporäre E-Mail für Newsletter und Event-Anmeldungen verantwortungsvoll nutzen",
			description:
				"Ein praktischer Leitfaden, um optionale Newsletter und risikoarme Event-Mails vom Hauptpostfach zu trennen, ohne wichtige Hinweise oder Datenschutzkontrolle zu verlieren.",
			publishedAt: "2026-08-29",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-downloads",
			title: "Temporäre E-Mail für Downloads nutzen, ohne Zugriff oder Privatsphäre zu verlieren",
			description:
				"Ein praktischer Ablauf für Downloads mit geringem Risiko: Hauptpostfach, Dateien, Zugriff und Lizenznachweise schützen.",
			publishedAt: "2026-08-28",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-online-shopping",
			title: "Temporäre E-Mail beim Online-Einkauf nutzen, ohne Belege oder Retouren zu verlieren",
			description:
				"Ein praktischer Leitfaden für weniger Werbemails bei gleichzeitigem Zugriff auf Bestätigungen, Retouren, Garantien und Kontowiederherstellung.",
			publishedAt: "2026-08-27",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-free-trials",
			title: "Temporäre E-Mail für Gratis-Testversionen nutzen, ohne Zugriff zu verlieren",
			description:
				"Ein praktischer Ablauf für risikoarme Testversionen mit temporärer E-Mail und klaren Schritten für Zugriff, Nachweise und Kündigung.",
			publishedAt: "2026-08-26",
			readingMinutes: 9,
		},
		{
			slug: "are-temporary-emails-safe",
			title: "Sind temporäre E-Mails sicher? Datenschutzgrenzen erklärt",
			description:
				"Ein praktischer Rahmen: Was ein temporäres Postfach schützt, welche Risiken bleiben und wann eine dauerhafte Adresse nötig ist.",
			publishedAt: "2026-08-25",
			readingMinutes: 9,
		},
		{
			slug: "direct-email-inbox-link",
			title: "Ein temporäres Postfach direkt per E-Mail-Link öffnen",
			description:
				"So funktionieren direkte cleanorapi.com-Postfachlinks – mit passenden Einsatzfällen und den Datenschutzgrenzen eines Postfachs ohne Passwort.",
			publishedAt: "2026-08-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-best-practices",
			title:
				"Best Practices für temporäre E-Mails bei sicheren Registrierungen",
			description:
				"Praktische Regeln, um Spam zu reduzieren, Kontosperren zu vermeiden und dein Hauptpostfach zu schützen.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Temporäre E-Mail vs E-Mail-Alias: Was ist besser?",
			description:
				"Vergleiche temporäre Postfächer und Aliase nach Datenschutz, Wiederherstellung und Kontosicherheit.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "OTP-Mail kommt nicht an? 8 schnelle Lösungen",
			description:
				"Behebe verzögerte Verifizierungsmails mit einer klaren Checkliste für Neuversand, Blocklisten und Postfach-Refresh.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	ja: [
		{
			slug: "reopen-temporary-inbox-safely",
			title: "アクセスを失わずに一時受信箱を安全に再度開く方法",
			description:
				"ダイレクトリンク、ブラウザーセッション、24時間のメール保持がどう機能するかを理解し、アクセスを漏らしたり削除済みメールの復元を期待したりせずに一時受信箱を開き直す方法を解説します。",
			publishedAt: "2026-09-03",
			readingMinutes: 10,
		},
		{
			slug: "verification-link-expired",
			title: "認証リンクの期限切れにどう対処する？安全な復旧手順",
			description:
				"認証リンクが失効する理由と、再送を一度に抑え、ブラウザーセッションやフィッシングを確認しながら安全にアカウントを復旧する手順を解説します。",
			publishedAt: "2026-09-02",
			readingMinutes: 10,
		},
		{
			slug: "temporary-email-for-forum-signups",
			title: "フォーラムやコミュニティ登録に一時メールを使ってもよい？",
			description:
				"低リスクのフォーラムで一時メールを使う際に、アカウント復旧、評価、非公開メッセージ、将来のアクセスを失わないための判断ガイドです。",
			publishedAt: "2026-09-01",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-newsletters",
			title: "ニュースレター登録とイベント申込みで一時メールを適切に使う方法",
			description:
				"任意のニュースレターや低リスクのイベント連絡を主受信箱から分けつつ、重要な案内、チケット、プライバシー管理を失わないための実践ガイドです。",
			publishedAt: "2026-08-29",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-downloads",
			title: "アクセスとプライバシーを守る一時メールでの安全なダウンロード方法",
			description:
				"低リスクの資料を一時メールで受け取り、受信箱、ファイル、アクセス権、ライセンス記録を守る実践的な手順です。",
			publishedAt: "2026-08-28",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-online-shopping",
			title: "ネット通販で一時メールを使い、領収書や返品手続きを失わない方法",
			description:
				"販促メールを普段の受信箱から分離しながら、注文確認、返品、保証、アカウント復旧に必要な記録を守る実践ガイドです。",
			publishedAt: "2026-08-27",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-free-trials",
			title: "無料トライアルで一時メールを使い、必要なアクセスを失わない方法",
			description:
				"低リスクの試用で一時メールを活用しつつ、重要になった際のアクセス、記録、解約管理を保つ実践的な流れです。",
			publishedAt: "2026-08-26",
			readingMinutes: 9,
		},
		{
			slug: "are-temporary-emails-safe",
			title: "一時メールは安全？プライバシーの限界と正しい使い方",
			description:
				"一時メールで守れること、残るリスク、恒久的なメールアドレスへ切り替えるべき時を実践的に解説します。",
			publishedAt: "2026-08-25",
			readingMinutes: 9,
		},
		{
			slug: "direct-email-inbox-link",
			title: "メールアドレスのリンクから一時受信箱を直接開く方法",
			description:
				"cleanorapi.com の受信箱直リンクの使い方、適した場面、24時間セッション、パスワードなしで利用する際の注意点を解説します。",
			publishedAt: "2026-08-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-best-practices",
			title: "安全な登録のための一時メール運用ベストプラクティス",
			description:
				"スパム削減、ロックアウト回避、メイン受信箱保護のための実践的な一時メール運用を解説します。",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "一時メールとメールエイリアスの違い：どちらを使うべき？",
			description:
				"プライバシー、復旧性、長期アカウント安全性の観点で一時メールとエイリアスを比較します。",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "OTPメールが届かない？効果的な8つの対処法",
			description:
				"再送、送信元ポリシー、受信箱更新の順で確認できる実用チェックリストを紹介します。",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	ko: [
		{
			slug: "reopen-temporary-inbox-safely",
			title: "접근 권한을 잃지 않고 임시 받은편지함을 안전하게 다시 여는 방법",
			description:
				"직접 받은편지함 링크, 브라우저 세션, 24시간 메일 보관 방식을 이해하고 접근 정보를 노출하거나 삭제된 메일 복구를 기대하지 않으면서 임시 메일함을 다시 여는 방법을 안내합니다.",
			publishedAt: "2026-09-03",
			readingMinutes: 10,
		},
		{
			slug: "verification-link-expired",
			title: "인증 링크가 만료되었을 때 안전하게 복구하는 방법",
			description:
				"인증 링크가 만료되는 이유와 한 번의 재전송, 브라우저 세션 확인, 피싱 점검, 장기 이메일 전환을 포함한 안전한 복구 절차를 알아보세요.",
			publishedAt: "2026-09-02",
			readingMinutes: 10,
		},
		{
			slug: "temporary-email-for-forum-signups",
			title: "포럼과 커뮤니티 가입에 임시 이메일을 사용해도 될까요?",
			description:
				"저위험 포럼에서 임시 이메일을 사용할 때 계정 복구, 평판, 비공개 메시지, 장기 접근 권한을 잃지 않도록 돕는 실용 가이드입니다.",
			publishedAt: "2026-09-01",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-newsletters",
			title: "뉴스레터와 이벤트 신청에 임시 이메일을 책임감 있게 사용하는 방법",
			description:
				"선택적 뉴스레터와 저위험 이벤트 메일을 기본 받은편지함에서 분리하면서도 중요한 안내, 티켓, 개인정보 통제권을 지키는 실용 가이드입니다.",
			publishedAt: "2026-08-29",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-downloads",
			title: "접근 권한과 개인정보를 지키며 임시 이메일로 다운로드하는 방법",
			description:
				"저위험 리소스를 임시 이메일로 받을 때 받은편지함, 파일, 접근 권한, 라이선스 기록을 보호하는 실용적인 절차입니다.",
			publishedAt: "2026-08-28",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-online-shopping",
			title: "온라인 쇼핑에서 임시 이메일을 쓰면서 영수증과 반품 권한을 지키는 방법",
			description:
				"광고 메일은 기본 받은편지함에서 분리하면서 주문 확인, 반품, 보증, 계정 복구 기록은 안전하게 유지하는 실용 가이드입니다.",
			publishedAt: "2026-08-27",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-free-trials",
			title: "무료 체험에 임시 이메일을 쓰면서 중요한 접근 권한을 잃지 않는 방법",
			description:
				"저위험 무료 체험에서 임시 이메일을 사용하되 서비스가 중요해질 때 접근, 기록, 해지 관리를 지키는 실용적인 흐름입니다.",
			publishedAt: "2026-08-26",
			readingMinutes: 9,
		},
		{
			slug: "are-temporary-emails-safe",
			title: "임시 이메일은 안전할까? 개인정보 보호의 한계와 올바른 사용법",
			description:
				"임시 이메일이 보호하는 범위와 남는 위험, 영구 이메일로 전환해야 하는 시점을 실용적으로 설명합니다.",
			publishedAt: "2026-08-25",
			readingMinutes: 9,
		},
		{
			slug: "direct-email-inbox-link",
			title: "이메일 주소 링크로 임시 받은편지함 바로 열기",
			description:
				"cleanorapi.com 받은편지함 바로가기 링크의 사용법과 활용 사례, 24시간 세션, 비밀번호 없는 접근의 개인정보 한계를 알아보세요.",
			publishedAt: "2026-08-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-best-practices",
			title: "더 안전한 가입을 위한 임시 이메일 모범 사례",
			description:
				"스팸을 줄이고 계정 잠금을 피하며 기본 받은편지함을 보호하는 실전형 임시 이메일 전략입니다.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "임시 이메일 vs 이메일 별칭: 무엇을 써야 할까?",
			description:
				"개인정보 보호, 복구 가능성, 장기 계정 안정성 기준으로 임시 이메일과 별칭을 비교합니다.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "OTP 메일이 안 오나요? 빠르게 해결하는 8가지 방법",
			description:
				"재전송, 발신 도메인 정책, 받은편지함 새로고침을 중심으로 지연된 인증 메일을 해결하세요.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	ru: [
		{
			slug: "reopen-temporary-inbox-safely",
			title: "Как безопасно снова открыть временный ящик и не потерять доступ",
			description:
				"Разберитесь в прямых ссылках, браузерных сессиях и 24-часовом хранении, чтобы повторно открыть временную почту без раскрытия доступа и ложных ожиданий восстановления удалённых писем.",
			publishedAt: "2026-09-03",
			readingMinutes: 10,
		},
		{
			slug: "verification-link-expired",
			title: "Срок действия ссылки подтверждения истёк: безопасный порядок восстановления",
			description:
				"Разберитесь, почему истекают ссылки подтверждения, и безопасно выполните повторную отправку, проверку сеанса, защиту от фишинга и восстановление аккаунта.",
			publishedAt: "2026-09-02",
			readingMinutes: 10,
		},
		{
			slug: "temporary-email-for-forum-signups",
			title: "Стоит ли использовать временную почту для регистрации на форумах и в сообществах?",
			description:
				"Практическое руководство по временной почте для малорискованных форумов без потери восстановления, репутации, личных сообщений и будущего доступа.",
			publishedAt: "2026-09-01",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-newsletters",
			title: "Как ответственно использовать временную почту для рассылок и регистрации на мероприятия",
			description:
				"Практическое руководство: как отделить необязательные рассылки и письма о событиях с низким риском, не теряя важных напоминаний, билетов и контроля над приватностью.",
			publishedAt: "2026-08-29",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-downloads",
			title: "Как использовать временную почту для загрузок, сохраняя доступ и конфиденциальность",
			description:
				"Практичный порядок безопасной загрузки материалов с низким риском: защита основного ящика, файлов, доступа и лицензий.",
			publishedAt: "2026-08-28",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-online-shopping",
			title: "Как использовать временную почту для покупок и не потерять чеки или возвраты",
			description:
				"Практическое руководство: как отделить рекламу от основной почты и сохранить подтверждения, возвраты, гарантии и восстановление аккаунта.",
			publishedAt: "2026-08-27",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-free-trials",
			title: "Как использовать временную почту для пробного периода и не потерять доступ",
			description:
				"Практический порядок для низкорисковых пробных версий: меньше рассылок, но сохранённый доступ, записи и контроль отмены при необходимости.",
			publishedAt: "2026-08-26",
			readingMinutes: 9,
		},
		{
			slug: "are-temporary-emails-safe",
			title: "Безопасна ли временная почта? Ограничения конфиденциальности",
			description:
				"Практическая схема: что защищает временный адрес, какие риски остаются и когда нужен постоянный ящик.",
			publishedAt: "2026-08-25",
			readingMinutes: 9,
		},
		{
			slug: "direct-email-inbox-link",
			title: "Как открыть временный ящик по прямой ссылке с адресом",
			description:
				"Как работают прямые ссылки cleanorapi.com, когда они полезны и какие ограничения приватности есть у временного ящика без пароля.",
			publishedAt: "2026-08-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-best-practices",
			title: "Лучшие практики временной почты для более безопасных регистраций",
			description:
				"Практические рекомендации, как снизить спам, избежать блокировок и защитить основной почтовый ящик.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Временная почта vs почтовый алиас: что выбрать?",
			description:
				"Сравнение временной почты и алиасов по приватности, восстановлению доступа и долгосрочной безопасности.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "OTP-письмо не приходит? 8 быстрых решений",
			description:
				"Пошаговый чеклист для задержек писем подтверждения: повторная отправка, политика отправителя и обновление ящика.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	pt: [
		{
			slug: "reopen-temporary-inbox-safely",
			title: "Como reabrir uma caixa temporária com segurança sem perder o acesso",
			description:
				"Entenda links diretos, sessões do navegador e retenção de 24 horas para reabrir uma caixa temporária sem expor o acesso nem depender de mensagens já excluídas.",
			publishedAt: "2026-09-03",
			readingMinutes: 10,
		},
		{
			slug: "verification-link-expired",
			title: "Link de verificação expirado? Guia seguro para recuperar o acesso",
			description:
				"Entenda por que links de verificação expiram e siga um processo seguro de reenvio, preservação da sessão, prevenção de phishing e recuperação da conta.",
			publishedAt: "2026-09-02",
			readingMinutes: 10,
		},
		{
			slug: "temporary-email-for-forum-signups",
			title: "Vale a pena usar email temporário para cadastro em fóruns e comunidades?",
			description:
				"Um guia prático para usar email temporário em fóruns de baixo risco sem perder recuperação da conta, reputação, mensagens privadas ou acesso futuro.",
			publishedAt: "2026-09-01",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-newsletters",
			title: "Como usar email temporário para newsletters e inscrições em eventos com responsabilidade",
			description:
				"Um guia prático para separar newsletters opcionais e emails de eventos de baixo risco sem perder avisos, ingressos ou controle de privacidade.",
			publishedAt: "2026-08-29",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-downloads",
			title: "Como usar email temporário para downloads sem perder acesso ou privacidade",
			description:
				"Um processo prático para baixar recursos de baixo risco com email temporário e proteger caixa de entrada, arquivos, acesso e licenças.",
			publishedAt: "2026-08-28",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-online-shopping",
			title: "Como usar email temporário em compras online sem perder recibos ou devoluções",
			description:
				"Um guia prático para separar mensagens comerciais da caixa principal e preservar confirmações, devoluções, garantias e recuperação da conta.",
			publishedAt: "2026-08-27",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-free-trials",
			title: "Como usar email temporário em testes grátis sem perder acesso importante",
			description:
				"Um fluxo prático para testar serviços de baixo risco com email temporário e preservar acesso, registros e controle de cancelamento quando necessário.",
			publishedAt: "2026-08-26",
			readingMinutes: 9,
		},
		{
			slug: "are-temporary-emails-safe",
			title: "Email temporário é seguro? Limites de privacidade explicados",
			description:
				"Um guia prático sobre o que o email temporário protege, os riscos que permanecem e quando usar uma caixa permanente.",
			publishedAt: "2026-08-25",
			readingMinutes: 9,
		},
		{
			slug: "direct-email-inbox-link",
			title: "Abra uma caixa temporária diretamente por um link de email",
			description:
				"Entenda os links diretos do cleanorapi.com, quando usá-los e os limites de privacidade de uma caixa temporária sem senha.",
			publishedAt: "2026-08-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-best-practices",
			title: "Boas práticas de email temporário para cadastros mais seguros",
			description:
				"Aprenda práticas para reduzir spam, evitar bloqueios e proteger sua caixa principal com email temporário.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Email temporário vs alias de email: qual usar?",
			description:
				"Compare email temporário e alias por privacidade, recuperação e segurança de conta no longo prazo.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "Email OTP não chega? 8 correções rápidas",
			description:
				"Resolva atrasos de email de verificação com checklist prático de reenvio, bloqueios do remetente e atualização da caixa.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	ar: [
		{
			slug: "reopen-temporary-inbox-safely",
			title: "كيفية إعادة فتح صندوق بريد مؤقت بأمان من دون فقدان الوصول",
			description:
				"تعرّف إلى الروابط المباشرة وجلسات المتصفح والاحتفاظ بالرسائل لمدة 24 ساعة لإعادة فتح صندوق مؤقت من دون كشف الوصول أو توقع استعادة الرسائل المحذوفة.",
			publishedAt: "2026-09-03",
			readingMinutes: 10,
		},
		{
			slug: "verification-link-expired",
			title: "انتهت صلاحية رابط التحقق؟ خطوات آمنة لاستعادة الوصول",
			description:
				"تعرّف على أسباب انتهاء روابط التحقق واتبع خطوات آمنة لإعادة الإرسال والحفاظ على جلسة المتصفح وفحص التصيد واستعادة الحساب.",
			publishedAt: "2026-09-02",
			readingMinutes: 10,
		},
		{
			slug: "temporary-email-for-forum-signups",
			title: "هل يناسب البريد المؤقت التسجيل في المنتديات والمجتمعات؟",
			description:
				"دليل عملي لاستخدام البريد المؤقت في المنتديات منخفضة المخاطر دون فقدان استعادة الحساب أو السمعة أو الرسائل الخاصة أو الوصول المستقبلي.",
			publishedAt: "2026-09-01",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-newsletters",
			title: "استخدام البريد المؤقت للنشرات والتسجيل في الفعاليات بمسؤولية",
			description:
				"دليل عملي لفصل النشرات الاختيارية ورسائل الفعاليات منخفضة المخاطر عن بريدك الأساسي دون فقدان التنبيهات أو التذاكر أو التحكم بالخصوصية.",
			publishedAt: "2026-08-29",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-downloads",
			title: "استخدام بريد مؤقت للتنزيلات دون فقدان الوصول أو الخصوصية",
			description:
				"خطوات عملية لتنزيل موارد منخفضة المخاطر ببريد مؤقت مع حماية صندوقك وملفاتك ووصولك وسجلات الترخيص.",
			publishedAt: "2026-08-28",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-online-shopping",
			title: "كيفية استخدام البريد المؤقت للتسوق دون فقدان الإيصالات أو حق الإرجاع",
			description:
				"دليل عملي لفصل رسائل التسويق عن صندوقك الأساسي مع الاحتفاظ بتأكيدات الطلب والإرجاع والضمان واسترداد الحساب.",
			publishedAt: "2026-08-27",
			readingMinutes: 10,
		},
		{
			slug: "use-temp-email-for-free-trials",
			title: "كيف تستخدم بريداً مؤقتاً للتجارب المجانية من دون فقدان الوصول المهم",
			description:
				"خطوات عملية لتجربة خدمات منخفضة المخاطر ببريد مؤقت مع الحفاظ على الوصول والسجلات والتحكم في الإلغاء عند الحاجة.",
			publishedAt: "2026-08-26",
			readingMinutes: 9,
		},
		{
			slug: "are-temporary-emails-safe",
			title: "هل البريد المؤقت آمن؟ حدود الخصوصية وطريقة الاستخدام الصحيحة",
			description:
				"إطار عملي يوضح ما الذي يحميه البريد المؤقت، والمخاطر المتبقية، ومتى تحتاج إلى صندوق بريد دائم.",
			publishedAt: "2026-08-25",
			readingMinutes: 9,
		},
		{
			slug: "direct-email-inbox-link",
			title: "فتح صندوق بريد مؤقت مباشرة عبر رابط عنوان البريد",
			description:
				"تعرّف على روابط صندوق cleanorapi.com المباشرة، ومتى تستخدمها، وحدود الخصوصية في صندوق مؤقت بلا كلمة مرور.",
			publishedAt: "2026-08-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-best-practices",
			title: "أفضل ممارسات البريد المؤقت لتسجيلات أكثر أمانًا",
			description:
				"تعرف على ممارسات عملية لتقليل الرسائل المزعجة وتجنب قفل الحسابات وحماية صندوق بريدك الأساسي.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "البريد المؤقت مقابل الاسم المستعار للبريد: أيهما تختار؟",
			description:
				"مقارنة بين البريد المؤقت والاسم المستعار من حيث الخصوصية واستعادة الحساب وأمان الاستخدام طويل المدى.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "لا تصلك رسالة OTP؟ 8 حلول سريعة وفعالة",
			description:
				"عالج تأخر رسائل التحقق عبر قائمة عملية تشمل إعادة الإرسال وسياسة المرسل وتحديث صندوق الوارد.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
};

export function toBlogLocale(locale: Locale): BlogLocale {
	if ((BLOG_LOCALES as readonly string[]).includes(locale)) {
		return locale as BlogLocale;
	}
	return "en";
}

export function listBlogPosts(locale: Locale): BlogPostMeta[] {
	return BLOG_POSTS[toBlogLocale(locale)];
}

export function getBlogPageCount(locale: Locale): number {
	const totalPosts = listBlogPosts(locale).length;
	return Math.max(1, Math.ceil(totalPosts / BLOG_PAGE_SIZE));
}

export function getBlogPostsByPage(
	locale: Locale,
	page: number,
): BlogPostMeta[] {
	const safePage = Math.max(1, page);
	const start = (safePage - 1) * BLOG_PAGE_SIZE;
	return listBlogPosts(locale).slice(start, start + BLOG_PAGE_SIZE);
}

export function getBlogPostMeta(
	locale: Locale,
	slug: string,
): BlogPostMeta | null {
	const posts = listBlogPosts(locale);
	return posts.find((post) => post.slug === slug) ?? null;
}

export function getAllBlogSlugs(): string[] {
	const slugs = new Set<string>();
	for (const locale of BLOG_LOCALES) {
		for (const post of BLOG_POSTS[locale]) {
			slugs.add(post.slug);
		}
	}
	return Array.from(slugs);
}
