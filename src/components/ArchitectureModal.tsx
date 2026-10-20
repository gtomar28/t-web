import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Layers,
  ShieldCheck,
  Zap,
  Server,
  Database,
  Globe,
  Cpu,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { ArchitectureLayer } from "../types";

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCubeIndex?: number | null;
  onSelectCube?: (index: number) => void;
}

const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: "edge",
    name: "Edge Ingress & CDN Gateway",
    cubeIndex: 0,
    role: "Global low-latency DNS, TLS termination, and DDoS mitigation",
    tech: ["Anycast Edge", "WAF Protection", "Rate Limiting", "HTTP/3 Quic"],
    description:
      "The top-left accent block handles planetary routing with sub-15ms edge resolution. Serves millions of student and faculty requests with localized caching and instant failover.",
    color: "#E8A9C2",
  },
  {
    id: "gateway",
    name: "Unified API & Event Router",
    cubeIndex: 1,
    role: "High-throughput gRPC & REST message brokering",
    tech: [
      "Kong API Gateway",
      "Kafka Event Stream",
      "JWT/OAuth2 Auth",
      "Schema Registry",
    ],
    description:
      "Orchestrates asynchronous workloads across microservices and school tenant sub-domains, maintaining zero-loss event pipelines even during peak examination result releases.",
    color: "#B9A6D1",
  },
  {
    id: "services",
    name: "Distributed Services Cluster",
    cubeIndex: 2,
    role: "Isolated microservice containers & autoscaling compute",
    tech: [
      "Kubernetes (K8s)",
      "Istio Service Mesh",
      "Go / Node / Rust",
      "Autoscale HPA",
    ],
    description:
      "The central junction block coordinates attendance tracking, billing engines, academic grading algorithms, and real-time parent-teacher communications.",
    color: "#6B4A87",
  },
  {
    id: "erp-core",
    name: "Kiduart Modular ERP Business Engine",
    cubeIndex: 3,
    role: "Flagship enterprise school administration engine (kiduart.com)",
    tech: [
      "Multi-Tenant Isolation",
      "Custom Workflow Builder",
      "Role-Based RBAC",
      "Biometric/RFID Sync",
    ],
    description:
      "Trevyk’s flagship Kiduart school ERP (https://kiduart.com)  admissions through fees, attendance, exams, parent communication and more, matching the live product journey on kiduart.com.",
    color: "#5A3875",
  },
];

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose,
  initialCubeIndex = null,
  onSelectCube,
}) => {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(
    initialCubeIndex !== null && initialCubeIndex >= 0 ? initialCubeIndex : 0,
  );

  const selectedLayer =
    ARCHITECTURE_LAYERS[selectedLayerIndex] || ARCHITECTURE_LAYERS[0];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="architecture-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1E1024]/80 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          id="architecture-modal-card"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1E1024] border border-[#6B4A87]/50 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(107,74,135,0.16)] flex flex-col relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-[#6B4A87]/20 bg-[#1E1024]/80">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-[#6B4A87]/30 border border-[#6B4A87]/60 text-[#E8A9C2]">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F8F6FB]">
                  The &quot;T&quot; Architecture Blueprint
                </h3>
                <p className="text-xs sm:text-sm text-[#B9A6D1] mt-0.5">
                  How Trevyk&apos;s 4 modular cubes translate to production
                  infrastructure
                </p>
              </div>
            </div>

            <button
              id="close-modal-btn"
              onClick={onClose}
              className="p-2 rounded-full text-[#B9A6D1] hover:text-[#F8F6FB] hover:bg-[#2A1830] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
            {/* Left Column: layer selector */}
            <div className="md:col-span-5 flex flex-col space-y-2">
              <span className="text-[11px] font-mono-accent uppercase tracking-widest text-[#B9A6D1] px-1 mb-1">
                Modular Layers (1 to 4)
              </span>

              {ARCHITECTURE_LAYERS.map((layer, idx) => {
                const isActive = idx === selectedLayerIndex;
                return (
                  <button
                    key={layer.id}
                    onClick={() => {
                      setSelectedLayerIndex(idx);
                      onSelectCube?.(idx);
                    }}
                    className={`flex items-start text-left p-3.5 rounded-xl border transition-all ${
                      isActive
                        ? "bg-[#2A1830] border-[#E8A9C2] shadow-[0_0_20px_rgba(232,169,194,0.15)]"
                        : "bg-[#1E1024]/60 border-[#6B4A87]/30 hover:border-[#6B4A87]/70 hover:bg-[#2A1830]/40"
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full mt-1.5 mr-3 shrink-0"
                      style={{ backgroundColor: layer.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-semibold text-sm text-[#F8F6FB] truncate">
                          {layer.name}
                        </span>
                        <span className="text-[10px] font-mono-accent text-[#B9A6D1]">
                          Block 0{idx + 1}
                        </span>
                      </div>
                      <p className="text-xs text-[#B9A6D1]/80 line-clamp-1 mt-0.5">
                        {layer.role}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Layer Deep Dive */}
            <div className="md:col-span-7 bg-[#2A1830]/50 border border-[#6B4A87]/30 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-mono-accent font-bold"
                    style={{
                      backgroundColor: `${selectedLayer.color}25`,
                      color: selectedLayer.color,
                    }}
                  >
                    CUBE 0{selectedLayerIndex + 1}
                  </span>
                  <span className="text-xs text-[#B9A6D1] font-mono-accent">
                    • Production Grade Component
                  </span>
                </div>

                <h4 className="font-heading font-bold text-xl text-[#F8F6FB] mt-3">
                  {selectedLayer.name}
                </h4>
                <p className="text-xs font-mono-accent text-[#6B4A87] mt-1">
                  Role: {selectedLayer.role}
                </p>

                <p className="text-sm text-[#B9A6D1]/90 leading-relaxed mt-4">
                  {selectedLayer.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="mt-6">
                  <span className="text-[11px] font-mono-accent uppercase tracking-wider text-[#B9A6D1] block mb-2">
                    Core Technologies & Protocols:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedLayer.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-lg text-xs font-mono-accent bg-[#1E1024] border border-[#6B4A87]/40 text-[#F8F6FB] flex items-center space-x-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E8A9C2]" />
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Metric Card */}
              <div className="mt-6 pt-4 border-t border-[#6B4A87]/20 flex items-center justify-between text-xs text-[#B9A6D1]">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#E8A9C2]" />
                  <span>Zero Single Point of Failure Architecture</span>
                </div>
                <button
                  onClick={onClose}
                  className="text-[#E8A9C2] hover:underline font-heading font-medium flex items-center space-x-1"
                >
                  <span>Close & Explore</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
